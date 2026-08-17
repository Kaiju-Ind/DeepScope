import {
	Outlet,
	createHashHistory,
	createRootRoute,
	createRoute,
	createRouter,
} from '@tanstack/solid-router';

import { usePanel } from '@/panel/context';
import { CurrentPage } from '@/panel/pages/current';
import { ScansPage } from '@/panel/pages/scans';
import { SettingsPage } from '@/panel/pages/settings';
import { TechnologiesPage } from '@/panel/pages/technologies';
import { PanelShell } from '@/panel/shell';

function PanelRoot() {
	const panel = usePanel();
	return (
		<PanelShell.Root busy={panel.busy()}>
			<Outlet />
		</PanelShell.Root>
	);
}

const rootRoute = createRootRoute({ component: PanelRoot });
const currentRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: CurrentPage });
const technologiesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/technologies', component: TechnologiesPage });
const scansRoute = createRoute({ getParentRoute: () => rootRoute, path: '/scans', component: ScansPage });
const settingsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/settings', component: SettingsPage });
const routeTree = rootRoute.addChildren([currentRoute, technologiesRoute, scansRoute, settingsRoute]);

/** Hash history keeps extension navigation inside the single generated sidepanel.html document. */
export const panelRouter = createRouter({ routeTree, history: createHashHistory() });

declare module '@tanstack/solid-router' {
	interface Register {
		router: typeof panelRouter;
	}
}
