import { getDiagnosticBuildId } from "./build.ts";
import type { DiagnosticSurface } from "./contracts.ts";
import { persistDiagnosticFailure } from "./journal/index.ts";
import { toDiagnosticError } from "./journal/sanitize.ts";
import { diagnosticErrorType } from "@deepscope/detection/privacy/redaction";

const CRASH_HOOKS_KEY = '__kaijuDeepScopeCrashHooksV2';

export interface DiagnosticCrashHookOptions {
	/**
	 * Capture global `error` events from this execution context.
	 *
	 * Content scripts disable this listener because their global object is attached
	 * to the host page. We must not persist unrelated website failures as Kaiju
	 * extension crashes. Rejected promises and structured-clone failures remain
	 * useful because they originate from the isolated extension world.
	 */
	readonly captureGlobalError?: boolean;
	/**
	 * Include exception text, stack, and location for ordinary contexts by default.
	 * Disable this using the trusted privacy context to keep only fixed event
	 * messages and exception types.
	 */
	readonly includeErrorDetails?: boolean;
}

/** Owned crash-hook registration for one extension application context. */
export type DiagnosticCrashHooks = {
	readonly buildId: string;
	readonly surface: DiagnosticSurface;
	dispose(): void;
};

/** Record the effective policy so reinjection reuses only equivalent hooks. */
type DiagnosticCrashRegistration = DiagnosticCrashHooks & {
	readonly captureGlobalError: boolean;
	readonly includeErrorDetails: boolean;
};

/** Install exception and rejected-promise capture for one extension context run. */
export function installDiagnosticCrashHooks(
	surface: DiagnosticSurface,
	options: DiagnosticCrashHookOptions = {},
): DiagnosticCrashHooks {
	type Runtime = typeof globalThis & Record<string, DiagnosticCrashRegistration | undefined>;
	const runtime = globalThis as Runtime;
	const buildId = getDiagnosticBuildId();
	const captureGlobalError = options.captureGlobalError !== false;
	const includeErrorDetails = options.includeErrorDetails !== false;
	const existing = runtime[CRASH_HOOKS_KEY];
	if (
		existing?.buildId === buildId && existing.surface === surface &&
		existing.captureGlobalError === captureGlobalError && existing.includeErrorDetails === includeErrorDetails
	) return existing;
	existing?.dispose();

	const listeners: Array<{ readonly type: string; readonly listener: EventListener }> = [];
	/** Register a global crash listener only where supported and retain its identity for this hook owner's cleanup. */
	const add = (type: string, listener: EventListener): void => {
		if (typeof globalThis.addEventListener !== 'function') return;
		globalThis.addEventListener(type, listener);
		listeners.push({ type, listener });
	};

	if (captureGlobalError) {
		add('error', ((event: Event) => {
			const errorEvent = event as ErrorEvent;
			const error = errorEvent.error ?? errorEvent.message ?? 'Unhandled error';
			persistDiagnosticFailure({
				surface,
				category: ['kaiju-deepscope', surface, 'crash'],
				message: 'Unhandled JavaScript error.',
				...(includeErrorDetails
					? {
						error: toDiagnosticError(error),
						properties: { filename: errorEvent.filename, line: errorEvent.lineno, column: errorEvent.colno },
					}
					: { properties: { errorType: diagnosticErrorType(error) } }),
			});
		}) as EventListener);
	}

	add('unhandledrejection', ((event: Event) => {
		const rejection = event as PromiseRejectionEvent;
		persistDiagnosticFailure({
			surface,
			category: ['kaiju-deepscope', surface, 'crash'],
			message: 'Unhandled promise rejection.',
			...(includeErrorDetails
				? { error: rejection.reason }
				: { properties: { errorType: diagnosticErrorType(rejection.reason) } }),
		});
	}) as EventListener);

	add('messageerror', (() => {
		persistDiagnosticFailure({
			surface,
			category: ['kaiju-deepscope', surface, 'crash'],
			message: 'A structured-clone message could not be decoded.',
		});
	}) as EventListener);

	const hooks: DiagnosticCrashRegistration = {
		buildId,
		surface,
		captureGlobalError,
		includeErrorDetails,
		/** Remove this owner's listeners and clear the shared slot only if a replacement has not taken ownership. */
		dispose() {
			if (typeof globalThis.removeEventListener === 'function') {
				for (const { type, listener } of listeners) globalThis.removeEventListener(type, listener);
			}
			listeners.length = 0;
			if (runtime[CRASH_HOOKS_KEY] === hooks) delete runtime[CRASH_HOOKS_KEY];
		},
	};
	runtime[CRASH_HOOKS_KEY] = hooks;
	return hooks;
}
