import {
	Outlet,
	createHashHistory,
	createRootRoute,
	createRoute,
	createRouter,
} from '@tanstack/solid-router';

import { usePanel } from '@/app/context';
import { DiagnosticsPage } from '@/app/pages/diagnostics';
import { ScansPage } from '@/app/pages/scans';
import { SettingsPage } from '@/app/pages/settings';
import { SummaryPage } from '@/app/pages/summary';
import { TechnologiesPage } from '@/app/pages/technologies';
import { TechnologyPage } from '@/app/pages/technology';
import { PanelShell } from '@/app/shell';

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
const summaryRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: SummaryPage });
const technologiesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/technologies', component: TechnologiesPage });
const technologyRoute = createRoute({ getParentRoute: () => rootRoute, path: '/technology/$technologyId', component: TechnologyPage });
const scansRoute = createRoute({ getParentRoute: () => rootRoute, path: '/scans', component: ScansPage });
const diagnosticsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/diagnostics', component: DiagnosticsPage });
const settingsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/settings', component: SettingsPage });
const routeTree = rootRoute.addChildren([
	summaryRoute,
	technologiesRoute,
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
