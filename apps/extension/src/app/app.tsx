import { RouterProvider } from '@tanstack/solid-router';

import { PanelProvider } from '@/app/provider';
import { panelRouter } from '@/app/router';
import type { TargetPolicy } from '@/app/surface';

/** Mount the persistent panel state owner above the routed page tree. */
export function PanelApp(props: { readonly policy?: TargetPolicy }) {
	return (
		<PanelProvider policy={props.policy}>
			<RouterProvider router={panelRouter} />
		</PanelProvider>
	);
}
