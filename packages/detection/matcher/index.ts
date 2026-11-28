import type { ObservationPatternMatch } from "./types.ts";
import { gateSubject } from "../match/gate.ts";
import { matchObservationRule } from "./rule.ts";
import type { MatchIndexedObservationBatchInput, IndexedObservationPatternMatchBatch } from "./routing/types.ts";
import { createObservationMatcherIndex } from "./routing/index.ts";
import { createMutableMatcherDiagnostics, incrementCount, freezeDiagnostics } from "./diagnostics.ts";
import { findIndexedObservationRulesWithDiagnostics } from "./routing/select.ts";
import type { NormalizedObservationKind } from "../observations/index.ts";
import type { DetectionRunOptions } from "../types.ts";

/** Lookup table for rule kinds disabled before matcher routing begins. */
type DisabledKindLookup = Readonly<Partial<Record<string, true>>>;

/**
 * Match observations through a pre-routed registry index.
 *
 * The output shape matches `matchObservationBatch(...)` so downstream evidence,
 * candidate, replay, and side panel stages do not need to know whether routing was
 * sequential or indexed. Additional diagnostics describe how much matcher work
 * was avoided before full rule evaluation.
 */
export function matchIndexedObservationBatch(
	input: MatchIndexedObservationBatchInput,
): IndexedObservationPatternMatchBatch {
	const index = input.index ?? createObservationMatcherIndex(input.registry);
	const matches: ObservationPatternMatch[] = [];
	const diagnostics = createMutableMatcherDiagnostics();
	const disabledKinds = createDisabledKindLookup(input.options);

	for (const observation of input.batch.observations) {
		diagnostics.observationCount += 1;
		incrementCount(diagnostics.observationsByKind, observation.kind);

		if (isObservationKindDisabled(observation.kind, disabledKinds)) {
			diagnostics.skippedObservationCount += 1;
			incrementCount(diagnostics.skippedObservationsByKind, observation.kind);
			continue;
		}

		const route = findIndexedObservationRulesWithDiagnostics(index, observation);
		diagnostics.keyedRuleCount += route.keyedRuleCount;
		diagnostics.fallbackRuleCount += route.fallbackRuleCount;
		diagnostics.literalRuleCount += route.literalRuleCount;
		diagnostics.literalRejectedRuleCount += route.literalRejectedRuleCount;
		diagnostics.candidateRuleCount += route.rules.length;
		incrementCount(diagnostics.candidateRulesByKind, observation.kind, route.rules.length);

		// Lowercased gate subjects, computed at most once per observation.
		let lowerKey: string | undefined;
		let lowerValue: string | undefined;
		for (const indexedRule of route.rules) {
			// A rule whose gate literal is absent cannot match; skip its regex.
			if (indexedRule.gate !== undefined) {
				const subject = indexedRule.rule.kind === 'cookie'
					? (lowerKey ??= gateSubject(indexedRule.rule, observation).toLowerCase())
					: (lowerValue ??= gateSubject(indexedRule.rule, observation).toLowerCase());
				if (!subject.includes(indexedRule.gate)) continue;
			}
			const startedAt = input.onRuleEvaluation ? performance.now() : 0;
			const match = matchObservationRule({
				technology: indexedRule.technology,
				rule: indexedRule.rule,
				ruleIndex: indexedRule.ruleIndex,
				observation,
				options: input.options,
			});
			input.onRuleEvaluation?.({
				technology: indexedRule.technology,
				rule: indexedRule.rule,
				ruleIndex: indexedRule.ruleIndex,
				sequence: indexedRule.sequence,
				observation,
				matched: Boolean(match),
				durationMs: performance.now() - startedAt,
			});
			if (match) {
				matches.push(match);
			}
		}
	}
	diagnostics.matchCount = matches.length;

	return {
		target: input.batch.target,
		observedAt: input.batch.observedAt,
		matches,
		evidenceBatch: {
			target: input.batch.target,
			observedAt: input.batch.observedAt,
			entries: matches.map((match) => match.evidence),
		},
		diagnostics: freezeDiagnostics(diagnostics),
	};
}

/**
 * Decide whether an observation surface should be skipped before rule routing.
 *
 * Initial visible-tab analysis intentionally defers high-fan-out URL-like
 * surfaces. Skipping those observations before exact-key, literal, and fallback
 * buckets are consulted avoids doing thousands of candidate-rule lookups that
 * a deeper rule guard would reject anyway.
 */
function isObservationKindDisabled(
	kind: NormalizedObservationKind,
	disabledKinds: DisabledKindLookup | undefined,
): boolean {
	return disabledKinds?.[kind] === true;
}

/** Build a branch-friendly lookup once so the hot observation loop avoids repeated array scans. */
function createDisabledKindLookup(options: DetectionRunOptions | undefined): DisabledKindLookup | undefined {
	if (!options?.disabledKinds || options.disabledKinds.length === 0) {
		return undefined;
	}

	const lookup: Partial<Record<string, true>> = Object.create(null) as Partial<Record<string, true>>;
	for (const kind of options.disabledKinds) {
		lookup[kind] = true;
	}
	return Object.freeze(lookup);
}
