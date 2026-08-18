import { browser } from 'wxt/browser';

import * as logging from '@/lib/diagnostics/logging';

import { matchIndexedObservationBatch } from '../detection/observation-matcher-index';
import {
	MATCHER_OFFSCREEN_CHANNEL,
	type CancelMatcherJobMessage,
	createMatcherPartitionTasks,
	createMatcherPipelineResult,
	type MatcherJobRunResult,
	type MatcherOffscreenResponse,
	type OffscreenMatcherJobRequest,
	type RunMatcherJobMessage,
	type RunMatcherJobRequest,
} from '../matcher';

const matcherLogger = logging.get('background', 'offscreen-matcher');

/** Static WXT output path for the hidden matcher host document. */
const MATCHER_OFFSCREEN_DOCUMENT_PATH = '/offscreen.html';

/** Maximum time the background waits for the offscreen host to answer one job. */
const MATCHER_OFFSCREEN_TIMEOUT_MS = 120_000;

/** Promise shared by concurrent requests creating the same offscreen document. */
let creatingOffscreenDocument: Promise<void> | undefined;

class OffscreenMatcherJobCanceledError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'OffscreenMatcherJobCanceledError';
	}
}

/**
 * Run matcher work through the offscreen host and fall back in-process if needed.
 *
 * The fallback preserves correctness when development builds, unsupported
 * browsers, or worker startup errors make the offscreen path unavailable. The
 * fast path keeps CPU-bound matching out of the background service worker; the
 * fallback is intentionally visible through the `executor` field so diagnostics
 * can catch any return to background-bound matching.
 */
export async function runMatcherJobWithOffscreenFallback(
	request: RunMatcherJobRequest,
): Promise<MatcherJobRunResult> {
	if (shouldUseDevelopmentMatcherFallback()) {
		return runMatcherJobInBackgroundFallback(request, 'dev-fallback');
	}

	const offscreenResult = await tryRunMatcherJobInOffscreen(request);
	if (offscreenResult) {
		return offscreenResult;
	}

	return runMatcherJobInBackgroundFallback(request, 'background-fallback');
}

/** Ask the offscreen matcher host to cancel queued or running work for a job. */
export async function cancelOffscreenMatcherJob(jobId: string): Promise<void> {
	const message: CancelMatcherJobMessage = {
		channel: MATCHER_OFFSCREEN_CHANNEL,
		type: 'matcher.cancel-job',
		jobId,
	};

	try {
		await browser.runtime.sendMessage(message);
	} catch {
		// Cancellation is best-effort. The background still drops local context and
		// marks the durable job record canceled so stale progress cannot update UI.
	}
}

/**
 * WXT development builds can serve worker modules through Vite's dev server.
 * Running the same CPU work in the background during development keeps the
 * extension reloadable while production builds still use the offscreen worker
 * pool that represents the real user runtime.
 */
function shouldUseDevelopmentMatcherFallback(): boolean {
	return import.meta.env.DEV;
}

async function tryRunMatcherJobInOffscreen(
	request: RunMatcherJobRequest,
): Promise<MatcherJobRunResult | null> {
	if (!await ensureOffscreenDocument()) {
		return null;
	}

	const message: RunMatcherJobMessage = {
		channel: MATCHER_OFFSCREEN_CHANNEL,
		type: 'matcher.run-job',
		request: createOffscreenMatcherJobRequest(request),
	};
	try {
		const response = await withMatcherTimeout(
			browser.runtime.sendMessage(message) as Promise<MatcherOffscreenResponse>,
			MATCHER_OFFSCREEN_TIMEOUT_MS,
		);
		if (response.ok && 'value' in response) {
			const result = createMatcherPipelineResult({
				batch: request.batch,
				registry: request.registry,
				compiledRegistryArtifact: { relationshipGraph: request.relationshipGraph },
				partitions: response.value.partitions,
				analyzedAt: request.analyzedAt,
				source: request.source,
			});
			return {
				job: response.value.job,
				mode: response.value.mode,
				result,
				partitions: response.value.partitions,
				executor: 'offscreen-worker-pool',
				completedAt: Date.now(),
			};
		}
		if (!response.ok && isOffscreenMatcherCancellationMessage(response.message)) {
			throw new OffscreenMatcherJobCanceledError(response.message);
		}
		matcherLogger.warning('Offscreen matcher returned no job result.', { response });
		return null;
	} catch (error) {
		if (error instanceof OffscreenMatcherJobCanceledError) {
			throw error;
		}

		// A timeout only stops the caller's wait. Explicitly cancel the offscreen copy
		// before background fallback starts so both executors cannot keep matching the
		// same large page batch at the same time.
		await cancelOffscreenMatcherJob(request.job.jobId);
		matcherLogger.warning('Offscreen matcher failed; using background fallback.', { error });
		return null;
	}
}

/** Remove registry-scale fields before one matcher job crosses into the offscreen context. */
function createOffscreenMatcherJobRequest(request: RunMatcherJobRequest): OffscreenMatcherJobRequest {
	return {
		job: request.job,
		mode: request.mode,
		batch: request.batch,
		...(request.options ? { options: request.options } : {}),
		...(request.maxWorkerCount === undefined ? {} : { maxWorkerCount: request.maxWorkerCount }),
	};
}

function isOffscreenMatcherCancellationMessage(message: string): boolean {
	return message.toLowerCase().includes('canceled');
}

export async function ensureOffscreenDocument(): Promise<boolean> {
	const offscreen = browser.offscreen;
	if (!offscreen) {
		return false;
	}

	if (await hasMatcherOffscreenDocument()) {
		return true;
	}

	if (!creatingOffscreenDocument) {
		creatingOffscreenDocument = offscreen.createDocument({
			url: MATCHER_OFFSCREEN_DOCUMENT_PATH,
			reasons: [offscreen.Reason.WORKERS, offscreen.Reason.DOM_PARSER],
			justification: 'Run CPU-bound technology matching and DOM selector parsing outside the visible page and background service worker.',
		}).finally(() => {
			creatingOffscreenDocument = undefined;
		});
	}

	try {
		await creatingOffscreenDocument;
		return true;
	} catch {
		return await hasMatcherOffscreenDocument();
	}
}

async function hasMatcherOffscreenDocument(): Promise<boolean> {
	const runtime = browser.runtime;
	if (!runtime.getContexts) {
		return false;
	}

	const contexts = await runtime.getContexts({
		contextTypes: [runtime.ContextType.OFFSCREEN_DOCUMENT],
		documentUrls: [runtime.getURL(MATCHER_OFFSCREEN_DOCUMENT_PATH)],
	});
	return contexts.length > 0;
}

async function runMatcherJobInBackgroundFallback(
	request: RunMatcherJobRequest,
	executor: MatcherJobRunResult['executor'],
): Promise<MatcherJobRunResult> {
	const partitions = createMatcherPartitionTasks({
		job: request.job,
		batch: request.batch,
		options: request.options,
	}).map((task) => {
		const observationIndexes = new Map(task.batch.observations.map((observation, index) => [
			observation,
			task.observationIndexes[index] ?? index,
		]));
		const matched = matchIndexedObservationBatch({
			registry: request.registry,
			batch: task.batch,
			index: request.index,
			options: task.options,
		});

		return {
			job: task.job,
			partitionId: task.partitionId,
			kind: task.kind,
			priority: task.priority,
			observationCount: task.batch.observations.length,
			matches: matched.matches.map((match, matchIndex) => ({
				observationIndex: observationIndexes.get(match.observation) ?? matchIndex,
				matchIndex,
				match,
			})),
			diagnostics: matched.diagnostics,
			completedAt: Date.now(),
		};
	});
	const result = createMatcherPipelineResult({
		batch: request.batch,
		registry: request.registry,
		compiledRegistryArtifact: { relationshipGraph: request.relationshipGraph },
		partitions,
		analyzedAt: request.analyzedAt,
		source: request.source,
	});

	return {
		job: request.job,
		mode: request.mode,
		result,
		partitions,
		executor,
		completedAt: Date.now(),
	};
}

function withMatcherTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
	return new Promise((resolve, reject) => {
		const timer = globalThis.setTimeout(() => {
			reject(new Error('Offscreen matcher host did not respond before the timeout.'));
		}, timeoutMs);
		promise.then((value) => {
			globalThis.clearTimeout(timer);
			resolve(value);
		}, (error) => {
			globalThis.clearTimeout(timer);
			reject(error);
		});
	});
}
