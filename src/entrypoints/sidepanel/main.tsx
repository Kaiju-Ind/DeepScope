import { ErrorBoundary } from 'solid-js';
import { render } from 'solid-js/web';

import { SupportFallback } from '@/app/components/support-fallback';
import { installDiagnosticCrashHooks } from '@/lib/diagnostics/crash';
import { persistDiagnosticFailure } from '@/lib/diagnostics/journal';
import * as logging from '@/lib/diagnostics/logging';

import '@/styles/app.css';
import '@/styles/panel.css';

logging.configure('sidepanel');
installDiagnosticCrashHooks('sidepanel');

const root = document.getElementById('root');
if (!root) throw new Error('Kaiju DeepScope side-panel root is missing.');

void import('@/app/app')
	.then(({ PanelApp }) => {
		render(
			() => (
				<ErrorBoundary fallback={(error, reset) => <SupportFallback surface="sidepanel" error={error} reset={reset} />}>
					<PanelApp />
				</ErrorBoundary>
			),
			root,
		);
	})
	.catch((error: unknown) => {
		persistDiagnosticFailure({
			surface: 'sidepanel',
			category: ['kaiju-deepscope', 'sidepanel', 'startup'],
			message: 'The side-panel application failed before its routed UI mounted.',
			error,
		});
		render(() => <SupportFallback surface="sidepanel" error={error} />, root);
	});
