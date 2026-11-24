import { getDiagnosticBuildId } from './build';
import type { DiagnosticSurface } from './contracts';
import { persistDiagnosticFailure, toDiagnosticError } from './journal';
import { diagnosticErrorType } from '@/lib/privacy/redaction';

const CRASH_HOOKS_KEY = '__kaijuDeepScopeCrashHooksV2';

export interface DiagnosticCrashHookOptions {
	/**
	 * Capture global `error` events from this execution context.
	 *
	 * Content scripts disable this listener because their global object is attached
	 * to the host page. We must not persist unrelated website failures as Kaiju
	 * extension crashes. Rejected promises and structured-clone failures remain
	 * useful; a rejection is kept only when its promise belongs to this realm.
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

/**
 * Whether a rejected promise belongs to this context's own realm.
 *
 * Firefox delivers the host page's unhandled rejections to a content script's
 * window listeners as well; their promises come from the page's realm (and
 * reach the script as cross-compartment wrappers), and they are the page's
 * failures, not DeepScope's. An event without a promise is kept.
 */
function isOwnPromise(promise: unknown): boolean {
	if (promise === undefined) return true;
	try {
		return promise instanceof Promise;
	} catch {
		return false;
	}
}

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
		if (!isOwnPromise(rejection.promise)) return;
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
