import { browser } from 'wxt/browser';

import * as logging from '../../diagnostics/logging';
import {
	MATCHER_OFFSCREEN_CHANNEL,
	type CancelMatcherJobMessage,
	type CancelMatcherTabMessage,
	type MatcherOffscreenRequestMessage,
	type MatcherOffscreenResponse,
	type ReleaseMatcherLifecycleMessage,
	type RunMatcherPartitionRequest,
	type TouchMatcherLifecycleMessage,
} from '../contracts';
import { MatcherError } from '../error';
import { MATCHER_PARTITION_CONCURRENCY } from '../policy';
import { Pool } from './pool';

const logger = logging.get('offscreen', 'matcher-host');

/**
 * Safety watchdog for a staged analysis that stops touching its matcher lifecycle.
 *
 * Normal completion releases the lifecycle explicitly and closes immediately.
 * This timer exists only for background interruption or a missed release message.
 */
const HOST_IDLE_MS = 30_000;

/** Staged analysis lifecycle retained only while its background owner can still produce matcher partitions. */
interface MatcherLifecycleLease {
	readonly tabId: number;
	lastTouchedAt: number;
}

/** Hidden offscreen host that owns only active dedicated-worker execution. */
export class Host {
	/** Analysis lifecycle leases that keep the hot two-worker pool available between staged passes. */
	readonly #lifecycles = new Map<string, MatcherLifecycleLease>();
	/** Number of scheduler-selected partitions currently executing in dedicated workers. */
	#activePartitions = 0;
	/** Hot dedicated-worker pool. Its worker heaps are the expensive active resource. */
	#pool: Pool | undefined;
	/** Offscreen-owned fallback cleanup timer. */
	#idleTimer: ReturnType<typeof globalThis.setTimeout> | undefined;

	/** Register the offscreen partition execution protocol. */
	start(): void {
		browser.runtime.onMessage.addListener((message: unknown) => {
			if (!isMatcherOffscreenRequestMessage(message)) return;
			if (message.type === 'matcher.ping') return Promise.resolve({ ok: true, ready: true } satisfies MatcherOffscreenResponse);
			if (message.type === 'matcher.cancel-job') return Promise.resolve(this.#cancelJob(message));
			if (message.type === 'matcher.cancel-tab') return Promise.resolve(this.#cancelTab(message));
			if (message.type === 'matcher.lifecycle-touch') return Promise.resolve(this.#touchLifecycle(message));
			if (message.type === 'matcher.lifecycle-release') return Promise.resolve(this.#releaseLifecycle(message));
			this.#retainLifecycle(message.request);
			return this.#execute(message.request);
		});
	}

	/** Execute one scheduler-selected partition without retaining offscreen waiting work. */
	async #execute(request: RunMatcherPartitionRequest): Promise<MatcherOffscreenResponse> {
		this.#activePartitions += 1;
		this.#clearIdleTimer();
		try {
			return { ok: true, value: await this.#getPool().run(request.task, request.workerIndex) };
		} catch (error) {
			return {
				ok: false,
				reason: error instanceof MatcherError && error.reason === 'canceled' ? 'canceled' : 'failed',
				message: error instanceof Error ? error.message : 'Offscreen matcher partition failed.',
			};
		} finally {
			this.#activePartitions = Math.max(0, this.#activePartitions - 1);
			this.#scheduleIdle();
		}
	}

	/** Cancel only worker slots currently executing one matcher job. */
	#cancelJob(message: CancelMatcherJobMessage): MatcherOffscreenResponse {
		const canceledPartitionCount = this.#pool?.cancelJob(
			message.jobId,
			new MatcherError('canceled', 'Matcher job was canceled.'),
		) ?? 0;
		this.#scheduleIdle();
		return { ok: true, canceled: true, jobId: message.jobId, canceledPartitionCount };
	}

	/** Cancel active matcher partitions and lifecycle leases owned by one browser tab. */
	#cancelTab(message: CancelMatcherTabMessage): MatcherOffscreenResponse {
		const reason = new MatcherError('canceled', `Matcher tab work was canceled: ${message.reason}.`);
		const canceledPartitionCount = this.#pool?.cancelTab(message.tabId, reason) ?? 0;
		for (const [lifecycleId, lease] of this.#lifecycles) {
			if (lease.tabId === message.tabId) this.#lifecycles.delete(lifecycleId);
		}
		this.#scheduleIdle();
		return { ok: true, canceledTab: true, tabId: message.tabId, canceledPartitionCount };
	}

	/** Refresh the watchdog while staged collection is expected to queue another matcher pass. */
	#touchLifecycle(message: TouchMatcherLifecycleMessage): MatcherOffscreenResponse {
		const existing = this.#lifecycles.get(message.lifecycleId);
		if (existing) existing.lastTouchedAt = Date.now();
		else this.#lifecycles.set(message.lifecycleId, { tabId: message.tabId, lastTouchedAt: Date.now() });
		this.#scheduleIdle();
		return { ok: true, lifecycle: 'touched', lifecycleId: message.lifecycleId };
	}

	/** Release one completed analysis lifecycle and dispose expensive worker heaps as soon as no work remains. */
	#releaseLifecycle(message: ReleaseMatcherLifecycleMessage): MatcherOffscreenResponse {
		this.#lifecycles.delete(message.lifecycleId);
		if (this.#activePartitions === 0 && this.#lifecycles.size === 0) {
			this.#disposePool('Matcher analysis lifecycle completed.');
			this.#emitHostIdle('analysis-complete');
		} else {
			this.#scheduleIdle();
		}
		return { ok: true, lifecycle: 'released', lifecycleId: message.lifecycleId };
	}

	/** Keep one lifecycle warm after its first selected partition reaches the offscreen host. */
	#retainLifecycle(request: RunMatcherPartitionRequest): void {
		if (!request.lifecycleId) return;
		this.#lifecycles.set(request.lifecycleId, {
			tabId: request.task.job.tabId,
			lastTouchedAt: Date.now(),
		});
		this.#clearIdleTimer();
	}

	/** Create the active two-worker pool only when matching first needs CPU capacity. */
	#getPool(): Pool {
		this.#clearIdleTimer();
		if (this.#pool) return this.#pool;
		this.#pool = new Pool(MATCHER_PARTITION_CONCURRENCY);
		logger.debug('Created matcher worker pool.', {
			event: 'matcher-worker-pool-created',
			workerCount: MATCHER_PARTITION_CONCURRENCY,
			activePartitionCount: this.#activePartitions,
		});
		return this.#pool;
	}

	/** Terminate both workers so their V8/native matcher state becomes collectible by Chromium. */
	#disposePool(reason: Error | string): void {
		this.#clearIdleTimer();
		const pool = this.#pool;
		if (!pool) return;
		pool.dispose(reason);
		this.#pool = undefined;
		logger.debug('Disposed matcher worker pool.', {
			event: 'matcher-worker-pool-disposed',
			reason: reason instanceof Error ? reason.message : reason,
			activePartitionCount: this.#activePartitions,
		});
	}

	/** Arm the offscreen-owned fallback cleanup deadline after productive work stops. */
	#scheduleIdle(): void {
		this.#clearIdleTimer();
		if (this.#activePartitions > 0) return;
		if (this.#lifecycles.size === 0) {
			this.#disposePool('Matcher host has no active analysis lifecycle.');
			this.#emitHostIdle('analysis-complete');
			return;
		}

		const now = Date.now();
		let nextDeadline = Number.POSITIVE_INFINITY;
		for (const lease of this.#lifecycles.values()) {
			nextDeadline = Math.min(nextDeadline, lease.lastTouchedAt + HOST_IDLE_MS);
		}
		const delayMs = Math.max(0, nextDeadline - now);
		this.#idleTimer = globalThis.setTimeout(() => this.#expireIdleLifecycles(), delayMs);
	}

	/** Expire only analysis lifecycles whose own watchdog deadline has elapsed. */
	#expireIdleLifecycles(): void {
		this.#idleTimer = undefined;
		if (this.#activePartitions > 0) return;
		const now = Date.now();
		for (const [lifecycleId, lease] of this.#lifecycles) {
			if (now - lease.lastTouchedAt >= HOST_IDLE_MS) this.#lifecycles.delete(lifecycleId);
		}
		if (this.#lifecycles.size > 0) {
			this.#scheduleIdle();
			return;
		}
		this.#disposePool(`Matcher host reached the ${HOST_IDLE_MS}ms idle watchdog.`);
		this.#emitHostIdle('watchdog');
	}

	/** Cancel the current fallback timer whenever real matcher activity resumes. */
	#clearIdleTimer(): void {
		if (this.#idleTimer === undefined) return;
		globalThis.clearTimeout(this.#idleTimer);
		this.#idleTimer = undefined;
	}

	/** Tell the background to close the privileged offscreen document. */
	#emitHostIdle(reason: 'analysis-complete' | 'watchdog'): void {
		logger.debug('Matcher host became disposable.', {
			event: 'matcher-host-idle',
			reason,
			idleMs: reason === 'watchdog' ? HOST_IDLE_MS : 0,
		});
		void browser.runtime.sendMessage({
			channel: MATCHER_OFFSCREEN_CHANNEL,
			type: 'matcher.host-idle',
			idleAt: Date.now(),
		}).catch(() => undefined);
	}
}

/** Narrow runtime traffic to the matcher host command surface. */
function isMatcherOffscreenRequestMessage(message: unknown): message is MatcherOffscreenRequestMessage {
	return Boolean(
		message &&
		typeof message === 'object' &&
		'channel' in message &&
		message.channel === MATCHER_OFFSCREEN_CHANNEL &&
		'type' in message &&
		(
			message.type === 'matcher.run-partition' ||
			message.type === 'matcher.cancel-job' ||
			message.type === 'matcher.cancel-tab' ||
			message.type === 'matcher.lifecycle-touch' ||
			message.type === 'matcher.lifecycle-release' ||
			message.type === 'matcher.ping'
		),
	);
}
