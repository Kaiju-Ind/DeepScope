import { getDiagnosticBuildId } from './build';
import type { DiagnosticSurface } from './contracts';
import { persistDiagnosticFailure, toDiagnosticError } from './journal';

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
}

/** Owned crash-hook registration for one extension application context. */
export type DiagnosticCrashHooks = {
	readonly buildId: string;
	readonly surface: DiagnosticSurface;
	dispose(): void;
};

/** Install exception and rejected-promise capture for one extension context run. */
export function installDiagnosticCrashHooks(
	surface: DiagnosticSurface,
	options: DiagnosticCrashHookOptions = {},
): DiagnosticCrashHooks {
	type Runtime = typeof globalThis & Record<string, DiagnosticCrashHooks | undefined>;
	const runtime = globalThis as Runtime;
	const buildId = getDiagnosticBuildId();
	const existing = runtime[CRASH_HOOKS_KEY];
	if (existing?.buildId === buildId && existing.surface === surface) return existing;
	existing?.dispose();

	const listeners: Array<{ readonly type: string; readonly listener: EventListener }> = [];
	const add = (type: string, listener: EventListener): void => {
		if (typeof globalThis.addEventListener !== 'function') return;
		globalThis.addEventListener(type, listener);
		listeners.push({ type, listener });
	};

	if (options.captureGlobalError !== false) {
		add('error', ((event: Event) => {
			const errorEvent = event as ErrorEvent;
			const error = toDiagnosticError(errorEvent.error ?? errorEvent.message ?? 'Unhandled error');
			persistDiagnosticFailure({
				surface,
				category: ['kaiju-deepscope', surface, 'crash'],
				message: 'Unhandled JavaScript error.',
				error,
				properties: {
					filename: errorEvent.filename,
					line: errorEvent.lineno,
					column: errorEvent.colno,
				},
			});
		}) as EventListener);
	}

	add('unhandledrejection', ((event: Event) => {
		const rejection = event as PromiseRejectionEvent;
		persistDiagnosticFailure({
			surface,
			category: ['kaiju-deepscope', surface, 'crash'],
			message: 'Unhandled promise rejection.',
			error: rejection.reason,
		});
	}) as EventListener);

	add('messageerror', (() => {
		persistDiagnosticFailure({
			surface,
			category: ['kaiju-deepscope', surface, 'crash'],
			message: 'A structured-clone message could not be decoded.',
		});
	}) as EventListener);

	const hooks: DiagnosticCrashHooks = {
		buildId,
		surface,
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
