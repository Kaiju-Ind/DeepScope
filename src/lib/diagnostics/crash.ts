import { persistDiagnosticFailure, toDiagnosticError } from './journal';
import type { DiagnosticSurface } from './contracts';

const CRASH_HOOKS_KEY = '__kaijuSiteScopeCrashHooksV1';

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

/** Install exception and rejected-promise capture once for an extension context. */
export function installDiagnosticCrashHooks(
	surface: DiagnosticSurface,
	options: DiagnosticCrashHookOptions = {},
): void {
	const runtime = globalThis as typeof globalThis & Record<string, boolean | undefined>;
	if (runtime[CRASH_HOOKS_KEY] || typeof globalThis.addEventListener !== 'function') return;
	runtime[CRASH_HOOKS_KEY] = true;

	if (options.captureGlobalError !== false) {
		globalThis.addEventListener('error', (event: Event) => {
			const errorEvent = event as ErrorEvent;
			const error = toDiagnosticError(errorEvent.error ?? errorEvent.message ?? 'Unhandled error');
			persistDiagnosticFailure({
				surface,
				category: ['kaiju-site-scope', surface, 'crash'],
				message: 'Unhandled JavaScript error.',
				error,
				properties: {
					filename: errorEvent.filename,
					line: errorEvent.lineno,
					column: errorEvent.colno,
				},
			});
		});
	}

	globalThis.addEventListener('unhandledrejection', (event: Event) => {
		const rejection = event as PromiseRejectionEvent;
		persistDiagnosticFailure({
			surface,
			category: ['kaiju-site-scope', surface, 'crash'],
			message: 'Unhandled promise rejection.',
			error: rejection.reason,
		});
	});

	globalThis.addEventListener('messageerror', () => {
		persistDiagnosticFailure({
			surface,
			category: ['kaiju-site-scope', surface, 'crash'],
			message: 'A structured-clone message could not be decoded.',
		});
	});
}
