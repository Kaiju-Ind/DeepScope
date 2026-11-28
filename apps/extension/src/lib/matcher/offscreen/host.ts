import { browser } from 'wxt/browser';

import * as logging from '../../diagnostics/logging.ts';
import { MATCHER_OFFSCREEN_CHANNEL, type MatcherHostFailure, type MatcherHostIdleMessage, type MatcherOffscreenRequestMessage, type MatcherOffscreenResponse } from "../contracts.ts";
import { MatcherError } from "../error.ts";
import { EXECUTOR_IDLE_MS, WorkerExecutor, type ExecutorIdleReason } from "../workers/executor.ts";

const logger = logging.get('offscreen', 'matcher-host');

/**
 * Chrome's offscreen matcher host.
 *
 * A Chrome extension's background is a service worker, which cannot construct a
 * `Worker`, so Chrome runs the matcher workers inside a hidden offscreen
 * document. This class only translates runtime messages to a
 * {@link WorkerExecutor}; the executor owns the workers, leases and watchdog.
 * Firefox and Safari use the same executor directly from their background page.
 */
export class Host {
	readonly #executor = new WorkerExecutor({ /** Forward the executor's idle reason and generation so the host closes only the lifecycle it still owns. */ onIdle: (reason, generation) => this.#emitHostIdle(reason, generation) });

	/** Register the offscreen partition execution protocol. */
	start(): void {
		browser.runtime.onMessage.addListener((message: unknown) => {
			if (!isMatcherOffscreenRequestMessage(message)) return;
			switch (message.type) {
				case 'matcher.ping':
					return Promise.resolve({ ok: true, ready: true } satisfies MatcherOffscreenResponse);
				case 'matcher.cancel-job': {
					const canceledPartitionCount = this.#executor.cancelJob(message.jobId);
					return Promise.resolve({ ok: true, canceled: true, jobId: message.jobId, canceledPartitionCount } satisfies MatcherOffscreenResponse);
				}
				case 'matcher.cancel-tab': {
					const canceledPartitionCount = this.#executor.cancelTab(message.tabId, message.reason);
					return Promise.resolve({ ok: true, canceledTab: true, tabId: message.tabId, canceledPartitionCount } satisfies MatcherOffscreenResponse);
				}
				case 'matcher.lifecycle-touch':
					this.#executor.touchLifecycle(message.lifecycleId, message.tabId);
					return Promise.resolve({ ok: true, lifecycle: 'touched', lifecycleId: message.lifecycleId } satisfies MatcherOffscreenResponse);
				case 'matcher.lifecycle-release':
					this.#executor.releaseLifecycle(message.lifecycleId);
					return Promise.resolve({ ok: true, lifecycle: 'released', lifecycleId: message.lifecycleId } satisfies MatcherOffscreenResponse);
				case 'matcher.idle-query':
					return Promise.resolve({
						ok: true,
						idle: this.#executor.isIdleAt(message.generation),
						generation: this.#executor.generation,
					} satisfies MatcherOffscreenResponse);
				default:
					return this.#execute(message);
			}
		});
	}

	/** Run one partition and turn a failure into the wire response the client expects. */
	async #execute(message: Extract<MatcherOffscreenRequestMessage, { type: 'matcher.run-partition' }>): Promise<MatcherOffscreenResponse> {
		try {
			return { ok: true, value: await this.#executor.run(message.request) };
		} catch (error) {
			return {
				ok: false,
				reason: getHostFailure(error),
				message: error instanceof Error ? error.message : 'Offscreen matcher partition failed.',
			};
		}
	}

	/** Tell the background it may close the offscreen document. */
	#emitHostIdle(reason: ExecutorIdleReason, generation: number): void {
		logger.debug('Matcher host became disposable.', {
			event: 'matcher-host-idle',
			reason,
			idleMs: reason === 'watchdog' ? EXECUTOR_IDLE_MS : 0,
		});
		const message: MatcherHostIdleMessage = {
			channel: MATCHER_OFFSCREEN_CHANNEL,
			type: 'matcher.host-idle',
			idleAt: Date.now(),
			generation,
		};
		void browser.runtime.sendMessage(message).catch(() => undefined);
	}
}

/** Map a partition failure to the wire reason the background maps back to `MatcherError`. */
function getHostFailure(error: unknown): MatcherHostFailure {
	if (!(error instanceof MatcherError)) return 'failed';
	if (error.reason === 'canceled') return 'canceled';
	if (error.reason === 'run-timeout') return 'timeout';
	return 'failed';
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
			message.type === 'matcher.idle-query' ||
			message.type === 'matcher.ping'
		),
	);
}
