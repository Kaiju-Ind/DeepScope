import {
	matchIndexedObservationBatch,
	type ObservationRuleEvaluationEvent,
} from '@/lib/detection/observation-matcher-index';
import { installDiagnosticCrashHooks } from '@/lib/diagnostics/crash';
import * as logging from '@/lib/diagnostics/logging';
import type { CompiledTechnologyRegistryArtifact } from '@/lib/registry/compiler-core';
import { createPackagedTechnologyRegistryProvider } from '@/lib/registry/packaged-provider';
import type {
	MatcherPartitionMatch,
	MatcherWorkerResponseMessage,
	MatcherWorkerRunMessage,
} from '@/lib/matcher/contracts';
import type { NormalizedObservationKind, ObservationValue } from '@/lib/observations';
import { redactEvidenceValue } from '@/lib/privacy/redaction';

/** Log individual rule checks that are slow enough to explain visible matcher stalls. */
const SLOW_RULE_EVALUATION_MS = 25;

/** Report matcher work that is slow enough to affect a visible analysis update. */
const SLOW_MATCH_MS = 250;

/** Report cold shard hydration separately from semantic rule matching. */
const SLOW_SHARD_LOAD_MS = 250;

/** Number of worst rule evaluations retained for one partition summary. */
const MAX_SLOW_EVALUATION_SUMMARY_ITEMS = 5;

logging.configure('matcher-worker');
installDiagnosticCrashHooks('matcher-worker');
const matcherWorkerLogger = logging.get('matcher-worker', 'matcher');

/** Worker global with the message contract used by the offscreen host. */
type MatcherWorkerGlobal = typeof globalThis & {
	/** Dedicated workers receive one partition task at a time from the offscreen host. */
	addEventListener: (type: 'message', listener: (event: MessageEvent<MatcherWorkerRunMessage>) => void) => void;
	/** Partition results are sent back to the owning worker slot. */
	postMessage: (message: MatcherWorkerResponseMessage) => void;
	/** Worker-local location used to resolve packaged registry assets. */
	location: Location;
};

const workerScope = globalThis as Partial<MatcherWorkerGlobal>;

/**
 * Worker-local provider keeps shard JSON and compiled indexes hot across tasks.
 *
 * The offscreen host now sends only the partition task. Each worker fetches the
 * observation-kind shard it needs from packaged extension assets, then reuses the
 * compiled index for later tasks with the same kind. This removes the old full
 * registry clone from every worker message and lets different workers match
 * different evidence surfaces in parallel.
 */
const registryProvider = createPackagedTechnologyRegistryProvider({
	resolveUrl(path) {
		const workerOrigin = workerScope.location?.origin ?? globalThis.location.origin;
		return new globalThis.URL(path, `${workerOrigin}/`).toString();
	},
});

const shardArtifactByKind = new Map<NormalizedObservationKind, Promise<CompiledTechnologyRegistryArtifact>>();

if (typeof workerScope.addEventListener === 'function') {
	workerScope.addEventListener('message', (event: MessageEvent<MatcherWorkerRunMessage>) => {
		if (event.data.type !== 'matcher-worker.run-partition') {
			return;
		}

		void runPartition(event.data)
			.then((response) => workerScope.postMessage?.(response))
			.catch((error) => {
				const message = error instanceof Error ? error.message : 'Matcher worker partition failed.';
				const response: MatcherWorkerResponseMessage = {
					type: 'matcher-worker.partition-failed',
					jobId: event.data.task.job.jobId,
					partitionId: event.data.task.partitionId,
					message,
				};
				workerScope.postMessage?.(response);
			});
	});
}

async function runPartition(message: MatcherWorkerRunMessage): Promise<MatcherWorkerResponseMessage> {
	const { task } = message;
	const partitionStartedAt = globalThis.performance.now();
	const observationIndexes = new Map(task.batch.observations.map((observation, index) => [
		observation,
		task.observationIndexes[index] ?? index,
	]));
	const slowestRuleEvaluations: SlowRuleEvaluationSummary[] = [];
	const shardCacheHit = shardArtifactByKind.has(task.kind);
	const shardLoadStartedAt = globalThis.performance.now();
	const shardArtifact = await getShardArtifact(task.kind);
	const shardReadyAt = globalThis.performance.now();
	const profileRules = matcherWorkerLogger.isEnabledFor('trace');
	const matchStartedAt = globalThis.performance.now();
	const matched = matchIndexedObservationBatch({
		registry: shardArtifact.technologies,
		batch: task.batch,
		index: shardArtifact.matcherIndex,
		options: task.options,
		onRuleEvaluation: profileRules
			? (event) => {
				const isSlowRule = event.durationMs >= SLOW_RULE_EVALUATION_MS;
				if (!isSlowRule && !shouldRememberSlowestRuleEvaluation(slowestRuleEvaluations, event.durationMs)) {
					return;
				}

				const summary = createRuleEvaluationSummary({
					task,
					event,
					observationIndex: observationIndexes.get(event.observation),
				});
				rememberSlowestRuleEvaluation(slowestRuleEvaluations, summary);

				if (isSlowRule) {
					matcherWorkerLogger.trace(formatSlowRuleEvaluationMessage(summary), { ...summary });
				}
			}
			: undefined,
	});
	const matchFinishedAt = globalThis.performance.now();
	const matches: MatcherPartitionMatch[] = matched.matches.map((match, matchIndex) => ({
		observationIndex: observationIndexes.get(match.observation) ?? matchIndex,
		matchIndex,
		match,
	}));
	const shardLoadDurationMs = shardReadyAt - shardLoadStartedAt;
	const matchDurationMs = matchFinishedAt - matchStartedAt;
	const partitionDurationMs = matchFinishedAt - partitionStartedAt;

	if (matchDurationMs >= SLOW_MATCH_MS || shardLoadDurationMs >= SLOW_SHARD_LOAD_MS) {
		matcherWorkerLogger.debug(
			[
				'Matcher partition performance:',
				`tabId=${task.job.tabId}`,
				`jobId=${task.job.jobId}`,
				`partitionId=${task.partitionId}`,
				`kind=${task.kind}`,
				`totalDurationMs=${roundDuration(partitionDurationMs)}`,
				`shardLoadDurationMs=${roundDuration(shardLoadDurationMs)}`,
				`matchDurationMs=${roundDuration(matchDurationMs)}`,
				`shardCacheHit=${shardCacheHit}`,
				`observationCount=${task.batch.observations.length}`,
				`candidateRuleCount=${matched.diagnostics.candidateRuleCount}`,
				`matchCount=${matched.matches.length}`,
				`slowest=${formatSlowRuleList(slowestRuleEvaluations)}`,
			].join(' '),
			withoutUndefined({
				tabId: task.job.tabId,
				jobId: task.job.jobId,
				sessionId: task.job.sessionId,
				expectedUrlPreview: previewLogValue(task.job.expectedUrl),
				partitionId: task.partitionId,
				kind: task.kind,
				priority: task.priority,
				totalDurationMs: roundDuration(partitionDurationMs),
				shardLoadDurationMs: roundDuration(shardLoadDurationMs),
				matchDurationMs: roundDuration(matchDurationMs),
				shardCacheHit,
				observationCount: task.batch.observations.length,
				candidateRuleCount: matched.diagnostics.candidateRuleCount,
				matchCount: matched.matches.length,
				slowestRuleEvaluations,
			}),
		);
	}

	return {
		type: 'matcher-worker.partition-complete',
		result: {
			job: task.job,
			partitionId: task.partitionId,
			kind: task.kind,
			priority: task.priority,
			observationCount: task.batch.observations.length,
			matches,
			diagnostics: matched.diagnostics,
			completedAt: Date.now(),
		},
	};
}

function getShardArtifact(kind: NormalizedObservationKind): Promise<CompiledTechnologyRegistryArtifact> {
	const existing = shardArtifactByKind.get(kind);
	if (existing) {
		return existing;
	}

	const artifact = registryProvider.getCompiledObservationKindRegistry(kind);
	shardArtifactByKind.set(kind, artifact);
	return artifact;
}

interface SlowRuleEvaluationSummary {
	readonly tabId: number;
	readonly jobId: string;
	readonly sessionId?: string;
	readonly expectedUrlPreview: string;
	readonly partitionId: string;
	readonly kind: NormalizedObservationKind;
	readonly observationIndex?: number;
	readonly observationKey?: string;
	readonly observationValuePreview: string;
	readonly observationValueLength: number;
	readonly technologyId: string;
	readonly technologyName: string;
	readonly ruleIndex: number;
	readonly ruleSequence: number;
	readonly rule: Record<string, unknown>;
	readonly matched: boolean;
	readonly durationMs: number;
}

function createRuleEvaluationSummary(input: {
	readonly task: MatcherWorkerRunMessage['task'];
	readonly event: ObservationRuleEvaluationEvent;
	readonly observationIndex: number | undefined;
}): SlowRuleEvaluationSummary {
	const observation = input.event.observation;
	const base = {
		tabId: input.task.job.tabId,
		jobId: input.task.job.jobId,
		sessionId: input.task.job.sessionId,
		expectedUrlPreview: previewLogValue(input.task.job.expectedUrl),
		partitionId: input.task.partitionId,
		kind: input.task.kind,
		observationIndex: input.observationIndex,
		observationKey: observation.key === undefined ? undefined : previewLogValue(observation.key),
		observationValuePreview: previewObservationValue(observation.value),
		observationValueLength: String(observation.value).length,
		technologyId: input.event.technology.id,
		technologyName: input.event.technology.name,
		ruleIndex: input.event.ruleIndex,
		ruleSequence: input.event.sequence,
		rule: describeRule(input.event.rule),
		matched: input.event.matched,
		durationMs: roundDuration(input.event.durationMs),
	};

	return withoutUndefined(base);
}

function rememberSlowestRuleEvaluation(
	slowestRuleEvaluations: SlowRuleEvaluationSummary[],
	summary: SlowRuleEvaluationSummary,
): void {
	slowestRuleEvaluations.push(summary);
	slowestRuleEvaluations.sort((left, right) => right.durationMs - left.durationMs);
	if (slowestRuleEvaluations.length > MAX_SLOW_EVALUATION_SUMMARY_ITEMS) {
		slowestRuleEvaluations.length = MAX_SLOW_EVALUATION_SUMMARY_ITEMS;
	}
}

function shouldRememberSlowestRuleEvaluation(
	slowestRuleEvaluations: readonly SlowRuleEvaluationSummary[],
	durationMs: number,
): boolean {
	if (slowestRuleEvaluations.length < MAX_SLOW_EVALUATION_SUMMARY_ITEMS) {
		return true;
	}

	const currentSmallestSlowEvaluation = slowestRuleEvaluations[slowestRuleEvaluations.length - 1];
	return currentSmallestSlowEvaluation !== undefined && durationMs > currentSmallestSlowEvaluation.durationMs;
}

function formatSlowRuleEvaluationMessage(summary: SlowRuleEvaluationSummary): string {
	return [
		'Slow matcher rule evaluation in worker:',
		`tabId=${summary.tabId}`,
		`jobId=${summary.jobId}`,
		`partitionId=${summary.partitionId}`,
		`kind=${summary.kind}`,
		`technologyId=${summary.technologyId}`,
		`technologyName=${quoteLogValue(summary.technologyName)}`,
		`ruleIndex=${summary.ruleIndex}`,
		`ruleSequence=${summary.ruleSequence}`,
		`ruleKind=${String(summary.rule.kind ?? 'unknown')}`,
		`ruleId=${String(summary.rule.id ?? 'none')}`,
		`durationMs=${summary.durationMs}`,
		`matched=${summary.matched}`,
		`observationIndex=${String(summary.observationIndex ?? 'unknown')}`,
		`observationKey=${quoteLogValue(summary.observationKey ?? '')}`,
		`observationValue=${quoteLogValue(summary.observationValuePreview)}`,
		`rulePattern=${quoteLogValue(getRulePatternPreview(summary.rule))}`,
	].join(' ');
}

function formatSlowRuleList(summaries: readonly SlowRuleEvaluationSummary[]): string {
	if (summaries.length === 0) {
		return 'none';
	}

	return summaries.map((summary) => [
		summary.durationMs,
		summary.technologyId,
		`ruleIndex:${summary.ruleIndex}`,
		String(summary.rule.kind ?? 'unknown'),
	].join(':')).join(',');
}

function getRulePatternPreview(rule: Record<string, unknown>): string {
	for (const key of ['pattern', 'valuePattern', 'keyPattern', 'hrefPattern', 'typePattern', 'mediaPattern', 'hreflangPattern']) {
		const pattern = rule[key];
		if (
			pattern &&
			typeof pattern === 'object' &&
			'source' in pattern &&
			typeof pattern.source === 'string'
		) {
			const flags = 'flags' in pattern && typeof pattern.flags === 'string' ? pattern.flags : '';
			return `/${pattern.source}/${flags}`;
		}
	}

	if (typeof rule.selector === 'string') return rule.selector;
	if (typeof rule.key === 'string') return rule.key;
	if (typeof rule.property === 'string') return rule.property;
	return '';
}

function quoteLogValue(value: string): string {
	return JSON.stringify(value);
}

function describeRule(rule: ObservationRuleEvaluationEvent['rule']): Record<string, unknown> {
	const details: Record<string, unknown> = {
		id: rule.id,
		kind: rule.kind,
		confidence: rule.confidence,
		sourceRuleIndex: rule.sourceRuleIndex,
	};

	if ('selector' in rule) details.selector = rule.selector;
	if ('attribute' in rule) details.attribute = rule.attribute;
	if ('key' in rule) details.key = rule.key;
	if ('property' in rule) details.property = rule.property;
	if ('pattern' in rule) details.pattern = describePattern(rule.pattern);
	if ('keyPattern' in rule) details.keyPattern = describePattern(rule.keyPattern);
	if ('valuePattern' in rule) details.valuePattern = describePattern(rule.valuePattern);
	if ('hrefPattern' in rule) details.hrefPattern = describePattern(rule.hrefPattern);
	if ('typePattern' in rule) details.typePattern = describePattern(rule.typePattern);
	if ('mediaPattern' in rule) details.mediaPattern = describePattern(rule.mediaPattern);
	if ('hreflangPattern' in rule) details.hreflangPattern = describePattern(rule.hreflangPattern);
	if ('recordType' in rule) details.recordType = rule.recordType;
	if ('area' in rule) details.area = rule.area;
	if ('rel' in rule) details.rel = rule.rel;
	if ('as' in rule) details.as = rule.as;

	return withoutUndefined(details);
}

function describePattern(pattern: RegExp | undefined): Record<string, string> | undefined {
	if (!pattern) return undefined;
	return {
		source: truncateForLog(pattern.source),
		flags: pattern.flags,
	};
}

function previewObservationValue(value: ObservationValue): string {
	return previewLogValue(String(value));
}

/** Redact query values and secret-like fragments before diagnostics reach browser logs. */
function previewLogValue(value: string): string {
	return redactEvidenceValue(value, 240);
}

function truncateForLog(value: string): string {
	if (value.length <= 240) return value;
	return `${value.slice(0, 240)}...`;
}

function roundDuration(durationMs: number): number {
	return Math.round(durationMs * 10) / 10;
}

function withoutUndefined<T extends Record<string, unknown>>(value: T): T {
	return Object.fromEntries(
		Object.entries(value).filter((entry) => entry[1] !== undefined),
	) as T;
}
