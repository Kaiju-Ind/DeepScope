import { RouterProvider } from '@tanstack/solid-router';

import { PanelProvider } from "./panel/provider.tsx";
import { panelRouter } from "./router.tsx";
import type { TargetPolicy } from "./browser/surface.ts";

/** Mount the persistent panel state owner above the routed page tree. */
export function PanelApp(props: { readonly policy?: TargetPolicy }) {
	return (
		<PanelProvider policy={props.policy}>
			<RouterProvider router={panelRouter} />
		</PanelProvider>
	);
}
