import {
	Navigate,
	Outlet,
	createHashHistory,
	createRootRoute,
	createRoute,
	createRouter,
} from '@tanstack/solid-router';

import { usePanel } from '@/panel/context';
import { DiagnosticsPage } from '@/panel/pages/diagnostics';
import { ScansPage } from '@/panel/pages/scans';
import { SettingsPage } from '@/panel/pages/settings';
import { TechnologiesPage } from '@/panel/pages/technologies';
import { TechnologyPage } from '@/panel/pages/technology';
import { PanelShell } from '@/panel/shell';

function PanelRoot() {
	const panel = usePanel();
	return (
		<PanelShell
			busy={panel.busy()}
			hostname={panel.analysis()?.hostname ?? panel.visibleTabIdentity()?.hostname}
		>
			<Outlet />
		</PanelShell>
	);
}

const rootRoute = createRootRoute({ component: PanelRoot });
const technologiesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: TechnologiesPage });
const technologiesAliasRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/technologies',
	component: () => <Navigate to="/" replace />,
});
const technologyRoute = createRoute({ getParentRoute: () => rootRoute, path: '/technology/$technologyId', component: TechnologyPage });
const scansRoute = createRoute({ getParentRoute: () => rootRoute, path: '/scans', component: ScansPage });
const diagnosticsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/diagnostics', component: DiagnosticsPage });
const settingsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/settings', component: SettingsPage });
const routeTree = rootRoute.addChildren([
	technologiesRoute,
	technologiesAliasRoute,
	technologyRoute,
	scansRoute,
	diagnosticsRoute,
	settingsRoute,
]);

/** Hash history keeps extension navigation inside the single generated sidepanel.html document. */
export const panelRouter = createRouter({ routeTree, history: createHashHistory() });

declare module '@tanstack/solid-router' {
	interface Register {
		router: typeof panelRouter;
	}
}
