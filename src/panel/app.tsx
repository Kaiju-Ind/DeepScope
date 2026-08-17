import { RouterProvider } from '@tanstack/solid-router';

import { PanelProvider } from '@/panel/provider';
import { panelRouter } from '@/panel/router';

/** Mount the persistent panel state owner above the routed page tree. */
export function PanelApp() {
	return (
		<PanelProvider>
			<RouterProvider router={panelRouter} />
		</PanelProvider>
	);
}
