import { RouterProvider } from '@tanstack/solid-router';

import { PanelProvider } from '@/app/provider';
import { panelRouter } from '@/app/router';

/** Mount the persistent panel state owner above the routed page tree. */
export function PanelApp() {
	return (
		<PanelProvider>
			<RouterProvider router={panelRouter} />
		</PanelProvider>
	);
}
