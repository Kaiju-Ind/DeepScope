import {
	Outlet,
	createHashHistory,
	createRootRoute,
	createRoute,
	createRouter,
	useLocation,
} from '@tanstack/solid-router';

import { createEffect } from 'solid-js';

import { usePanel } from "./panel/context.ts";
import * as session from "./panel/routes.ts";
import { DiagnosticsPage } from "./pages/diagnostics.tsx";
import { HistoryPage } from "./pages/history.tsx";
import { SettingsPage } from "./pages/settings.tsx";
import { SummaryPage } from "./pages/summary.tsx";
import { TechnologiesPage } from "./pages/technologies.tsx";
import { TechnologyPage } from "./pages/technology.tsx";
import { PanelShell } from "./shell.tsx";
import { openPage, policyFromLocation } from "./browser/surface.ts";

/** A full page is already pinned to its tab, so it does not offer to open another. */
const isFullPage = policyFromLocation(globalThis.location.href).kind === 'pinned';

/** Compose the routed side panel around the current analysis owner. */
function PanelRoot() {
	const panel = usePanel();
	/** Open the full-page surface only when the panel still has a visible tab identity. */
	const openVisibleTabPage = (): void => {
		const identity = panel.visibleTabIdentity();
		if (identity) void openPage(identity);
	};
	const location = useLocation();
	let activeTabId: number | undefined;
	let restoreGeneration = 0;

	/** Restore scroll after route composition and one delayed data-layout pass. */
	function restoreScroll(top: number): void {
		const generation = ++restoreGeneration;
		/** Restore scroll position only for the latest route-restoration generation, ignoring superseded callbacks. */
		const apply = () => {
			if (generation === restoreGeneration) globalThis.scrollTo?.(0, top);
		};

		globalThis.requestAnimationFrame?.(() => {
			apply();
			globalThis.requestAnimationFrame?.(apply);
		});
		globalThis.setTimeout?.(apply, 120);
	}

	createEffect(() => {
		const tabId = panel.visibleTabIdentity()?.tabId;
		if (tabId === undefined) return;

		if (activeTabId === tabId) {
			session.route(tabId, location().href);
			return;
		}

		if (activeTabId !== undefined) {
			session.route(activeTabId, location().href);
			session.scroll(activeTabId, globalThis.scrollY ?? 0);
		}

		activeTabId = tabId;
		const visit = session.open(tabId);
		panelRouter.history.replace(visit.first ? '/' : visit.route);
		restoreScroll(visit.first ? 0 : visit.scrollY);
	});

	return (
		<PanelShell
			busy={panel.busy()}
			hostname={panel.analysis()?.hostname ?? panel.visibleTabIdentity()?.hostname}
			onOpenPage={!isFullPage && panel.visibleTabIdentity() ? openVisibleTabPage : undefined}
		>
			<Outlet />
		</PanelShell>
	);
}

const rootRoute = createRootRoute({ component: PanelRoot });
const summaryRoute = createRoute({ /** Attach this route to the shared panel root so it inherits the same provider and surface lifecycle. */ getParentRoute: () => rootRoute, path: '/', component: SummaryPage });
const technologiesRoute = createRoute({ /** Attach this route to the shared panel root so it inherits the same provider and surface lifecycle. */ getParentRoute: () => rootRoute, path: '/technologies', component: TechnologiesPage });
const technologyRoute = createRoute({ /** Attach this route to the shared panel root so it inherits the same provider and surface lifecycle. */ getParentRoute: () => rootRoute, path: '/technology/$technologyId', component: TechnologyPage });
const historyRoute = createRoute({ /** Attach this route to the shared panel root so it inherits the same provider and surface lifecycle. */ getParentRoute: () => rootRoute, path: '/history', component: HistoryPage });
const diagnosticsRoute = createRoute({ /** Attach this route to the shared panel root so it inherits the same provider and surface lifecycle. */ getParentRoute: () => rootRoute, path: '/diagnostics', component: DiagnosticsPage });
const settingsRoute = createRoute({ /** Attach this route to the shared panel root so it inherits the same provider and surface lifecycle. */ getParentRoute: () => rootRoute, path: '/settings', component: SettingsPage });
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
