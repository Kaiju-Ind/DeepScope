import { RouterProvider } from '@tanstack/solid-router';
import { render } from 'solid-js/web';

import { configureKaijuSiteScopeLogging } from '@/lib/diagnostics/logging';
import { PanelProvider } from '@/panel/provider';
import { panelRouter } from '@/panel/router';

import './style.css';
import './App.css';

configureKaijuSiteScopeLogging('sidepanel');

render(
	() => (
		<PanelProvider>
			<RouterProvider router={panelRouter} />
		</PanelProvider>
	),
	document.getElementById('root')!,
);
