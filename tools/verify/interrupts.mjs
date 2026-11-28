// @ts-check

/**
 * Convert the first CLI interruption into cancellation of ordinary work.
 *
 * The caller still owns remote and native cleanup, which must not reuse the
 * canceled work signal. Remove both handlers after cleanup. A second signal
 * keeps Node's normal termination once its one-shot handler has fired.
 */
export function watchInterrupts() {
	const controller = new AbortController();
	/** @type {number | undefined} Preserve conventional interrupted-process exit status. */
	let exitCode;
	/** @param {'SIGINT' | 'SIGTERM'} signal User or supervisor cancellation. */
	function interrupted(signal) {
		exitCode = signal === 'SIGINT' ? 130 : 143;
		controller.abort(new Error(`Verification interrupted by ${signal}.`));
	}
	const interrupt = () => interrupted('SIGINT');
	const terminate = () => interrupted('SIGTERM');
	process.once('SIGINT', interrupt);
	process.once('SIGTERM', terminate);
	return {
		signal: controller.signal,
		get exitCode() { return exitCode; },
		/** Release only the listeners installed by this verification invocation. */
		close() {
			process.off('SIGINT', interrupt);
			process.off('SIGTERM', terminate);
		},
	};
}
