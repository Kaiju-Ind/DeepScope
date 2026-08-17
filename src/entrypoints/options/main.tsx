import { ErrorBoundary } from 'solid-js';
import { render } from 'solid-js/web';

import { SupportFallback } from '@/components/SupportFallback';
import { installDiagnosticCrashHooks } from '@/lib/diagnostics/crash';
import { persistDiagnosticFailure } from '@/lib/diagnostics/journal';
import { configureKaijuSiteScopeLogging } from '@/lib/diagnostics/logging';

import '@/styles/app.css';
import '@/styles/panel.css';

configureKaijuSiteScopeLogging('options');
installDiagnosticCrashHooks('options');

const root = document.getElementById('root');
if (!root) throw new Error('Kaiju Site Scope diagnostics root is missing.');

void import('@/components/DiagnosticsView')
	.then(({ DiagnosticsView }) => {
		render(
			() => (
				<ErrorBoundary fallback={(error, reset) => <SupportFallback surface="options" error={error} reset={reset} />}>
					<div class="k-panel-shell min-h-dvh">
						<main class="k-panel-main max-w-5xl py-8">
							<DiagnosticsView standalone />
						</main>
					</div>
				</ErrorBoundary>
			),
			root,
		);
	})
	.catch((error: unknown) => {
		persistDiagnosticFailure({
			surface: 'options',
			category: ['kaiju-site-scope', 'options', 'startup'],
			message: 'The diagnostics application failed before its primary UI mounted.',
			error,
		});
		render(() => <SupportFallback surface="options" error={error} />, root);
	});
