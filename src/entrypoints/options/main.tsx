import { ErrorBoundary } from 'solid-js';
import { render } from 'solid-js/web';

import { SupportFallback } from '@/app/components/support-fallback';
import { installDiagnosticCrashHooks } from '@/lib/diagnostics/crash';
import { persistDiagnosticFailure } from '@/lib/diagnostics/journal';
import * as logging from '@/lib/diagnostics/logging';

import '@/styles/app.css';
import '@/styles/panel.css';

logging.configure('options');
installDiagnosticCrashHooks('options');

const root = globalThis.document.getElementById('root');
if (!root) throw new Error('Kaiju DeepScope diagnostics root is missing.');

void import('@/app/components/diagnostics-view')
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
			category: ['kaiju-deepscope', 'options', 'startup'],
			message: 'The diagnostics application failed before its primary UI mounted.',
			error,
		});
		render(() => <SupportFallback surface="options" error={error} />, root);
	});
