import {
	Outlet,
	createHashHistory,
	createRootRoute,
	createRoute,
	createRouter,
	useLocation,
} from '@tanstack/solid-router';

import { createEffect } from 'solid-js';

import { usePanel } from '@/app/context';
import * as session from '@/app/session';
import { DiagnosticsPage } from '@/app/pages/diagnostics';
import { HistoryPage } from '@/app/pages/history';
import { SettingsPage } from '@/app/pages/settings';
import { SummaryPage } from '@/app/pages/summary';
import { TechnologiesPage } from '@/app/pages/technologies';
import { TechnologyPage } from '@/app/pages/technology';
import { PanelShell } from '@/app/shell';

/** Compose the routed side panel around the current analysis owner. */
function PanelRoot() {
	const panel = usePanel();
	const location = useLocation();
	let activeTabId: number | undefined;

	createEffect(() => {
		const tabId = panel.visibleTabIdentity()?.tabId;
		if (tabId === undefined) return;

		if (activeTabId === tabId) {
			session.route(tabId, location().href);
			return;
		}

		if (activeTabId !== undefined) session.route(activeTabId, location().href);
		activeTabId = tabId;
		const visit = session.open(tabId);
		panelRouter.history.replace(visit.first ? '/' : visit.route);
	});

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
const historyRoute = createRoute({ getParentRoute: () => rootRoute, path: '/history', component: HistoryPage });
const diagnosticsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/diagnostics', component: DiagnosticsPage });
const settingsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/settings', component: SettingsPage });
const routeTree = rootRoute.addChildren([
	summaryRoute,
	technologiesRoute,
	technologyRoute,
	historyRoute,
	diagnosticsRoute,
	settingsRoute,
]);

/** Hash history keeps extension navigation inside the generated sidepanel document. */
export const panelRouter = createRouter({ routeTree, history: createHashHistory() });

declare module '@tanstack/solid-router' {
	interface Register {
		router: typeof panelRouter;
	}
}
