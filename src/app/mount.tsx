import { ErrorBoundary } from 'solid-js';
import { render } from 'solid-js/web';

import { SupportFallback } from '@/app/components/support-fallback';
import type { PanelSurface, TargetPolicy } from '@/app/surface';
import { installDiagnosticCrashHooks } from '@/lib/diagnostics/crash';
import { persistDiagnosticFailure } from '@/lib/diagnostics/journal';
import * as logging from '@/lib/diagnostics/logging';

/**
 * Start the DeepScope application inside one extension surface.
 *
 * Every surface shares the same startup contract: diagnostics are configured
 * before the application loads, the routed tree loads lazily so a startup
 * failure can still render the support fallback, and that failure is recorded
 * under the surface that hit it.
 */
export function mountPanel(input: { readonly surface: PanelSurface; readonly policy?: TargetPolicy }): void {
	const { surface } = input;
	logging.configure(surface);
	installDiagnosticCrashHooks(surface);

	const root = globalThis.document.getElementById('root');
	if (!root) throw new Error(`Kaiju DeepScope ${surface} root is missing.`);

	void import('@/app/app')
		.then((module) => {
			const PanelApp = module.PanelApp;
			render(
				() => (
					<ErrorBoundary fallback={(error, reset) => <SupportFallback surface={surface} error={error} reset={reset} />}>
						<PanelApp policy={input.policy} />
					</ErrorBoundary>
				),
				root,
			);
		})
		.catch((error: unknown) => {
			persistDiagnosticFailure({
				surface,
				category: ['kaiju-deepscope', surface, 'startup'],
				message: `The ${surface} application failed before its routed UI mounted.`,
				error,
			});
			render(() => <SupportFallback surface={surface} error={error} />, root);
		});
}
