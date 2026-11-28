import { setTimeout as delay } from 'node:timers/promises';

import { INJECTED_MARKER } from './pages.mjs';

/**
 * Own browser mutations for one run. Successful creation and reconciliation
 * update the shared model; action errors remain evidence for the final report.
 * Every choice borrows the same random stream used by page selection.
 */
export function create(ext, control, plan, random, model, pages, report, hooks) {
	const { rnd, int, chance, pick } = random;
	const { tabs, windows, closedTabIds, touchedAt, addWindow, windowLabelById, addTab, dropTab, touch, normalTabs, normalWindows, tabLabels } = model;
	const { fixtureUrl, randomUrl, isOurs } = pages;
	const { info, log, step } = report;

	/** Execute a browser action and count normalized failures without stopping the remaining stress sequence. */
	async function call(action, body, ...args) {
		try {
			return await ext(body, ...args);
		} catch (error) {
			const message = String(error.message ?? error).replace(/\d+/g, 'N').slice(0, 160);
			const key = `${action}: ${message}`;
			info.actionErrors[key] = (info.actionErrors[key] ?? 0) + 1;
			return undefined;
		}
	}

	/** Open a seeded URL in an existing normal window or create a normal window when none remains. */
	async function openTab() {
		const w = pick(normalWindows());
		if (!w) return newWindow();
		const url = randomUrl();
		const active = chance(0.6);
		const tab = await call('open', `async (windowId, url, active) => { const t = await browser.tabs.create({ windowId, url, active }); return { id: t.id, windowId: t.windowId, incognito: t.incognito, pinned: t.pinned }; }`, w.id, url, active);
		if (!tab) return;
		addTab(tab, url);
		touch(tab.id);
		step('open', { tabId: tab.id, url, active });
	}

	/** Activate the selected modeled tab and retain the action without assuming analysis has already settled. */
	async function activate(label = pick(tabLabels())) {
		const tab = tabs.get(label);
		if (!tab) return;
		step('activate', { tabId: tab.id });
		await call('activate', `async (id) => { await browser.tabs.update(id, { active: true }); }`, tab.id);
	}

	/** Exercise rapid tab activation with seeded short gaps so multiple scans may overlap. */
	async function burst() {
		const n = 4 + int(12);
		const ids = [];
		for (let i = 0; i < n; i++) {
			const label = pick(tabLabels());
			if (!label) return;
			ids.push(tabs.get(label).id);
		}
		const gaps = ids.map(() => int(90));
		step('switch-burst', { tabIds: ids, gaps });
		await call('switch-burst', `async (ids, gaps) => {
			for (let i = 0; i < ids.length; i++) {
				browser.tabs.update(ids[i], { active: true }).catch(() => undefined);
				await new Promise((r) => setTimeout(r, gaps[i]));
			}
		}`, ids, gaps);
	}

	/** Exercise browser-window focus changes independently from the extension's modeled tab activation. */
	async function focusWindow() {
		const w = pick([...windows.values()]);
		if (!w) return;
		step('focus-window', { windowId: w.id });
		await call('focus-window', `async (id) => { await browser.windows.update(id, { focused: true }); }`, w.id);
	}

	/** Move or reorder a normal tab and update its modeled window only after the browser reports the move. */
	async function moveTab() {
		const label = pick(tabLabels((t) => !t.private));
		const targets = normalWindows();
		if (!label || targets.length < 1) return;
		const tab = tabs.get(label);
		const target = pick(targets);
		const index = chance(0.5) ? -1 : int(6);
		step(target.label === tab.windowLabel ? 'reorder' : 'move-window', { tabId: tab.id, toWindow: target.id, index });
		const moved = await call('move', `async (id, windowId, index) => { const r = await browser.tabs.move(id, { windowId, index }); const t = Array.isArray(r) ? r[0] : r; return t && { windowId: t.windowId }; }`, tab.id, target.id, index);
		if (moved) {
			const from = tab.windowLabel;
			tab.windowLabel = windowLabelById(moved.windowId) ?? target.label;
			if (from !== tab.windowLabel && ![...tabs.values()].some((t) => t.windowLabel === from)) windows.delete(from);
		}
	}

	/** Prefer closing recently active tabs while preserving enough tabs and one normal browsing context for the remaining scenario. */
	async function closeTab(label) {
		// Prefer a tab that is probably mid-scan: one touched in the last few seconds.
		const recent = tabLabels((t) => (touchedAt.get(t.id)?.at(-1) ?? 0) > Date.now() - 3000);
		label ??= recent.length && chance(0.6) ? pick(recent) : pick(tabLabels());
		const tab = tabs.get(label);
		if (!tab || tabs.size <= 3) return;
		// Never close the last tab of the last normal window.
		if (normalTabs().length <= 1 && !tab.private) return;
		touch(tab.id);
		step('close-tab', { tabId: tab.id, url: tab.url });
		await call('close-tab', `async (id) => { await browser.tabs.remove(id); }`, tab.id);
		dropTab(label);
	}

	/** Close a selected window while preserving the last normal window and recording closure for each modeled member tab. */
	async function closeWindow() {
		const candidates = [...windows.values()].filter((w) => w.private || normalWindows().length > 1);
		const w = pick(candidates);
		if (!w) return;
		const members = [...tabs.values()].filter((t) => t.windowLabel === w.label);
		for (const t of members) touch(t.id);
		step('close-window', { windowId: w.id, tabIds: members.map((t) => t.id), private: w.private });
		await call('close-window', `async (id) => { await browser.windows.remove(id); }`, w.id);
		for (const t of members) dropTab(t.label);
		windows.delete(w.label);
	}

	/** Create a seeded set of tabs in a requested normal or private window and retain the browser's actual privacy result. */
	async function newWindow(isPrivate = false) {
		const urls = Array.from({ length: 1 + int(3) }, () => isPrivate ? `${fixtureUrl()}&pv=1` : randomUrl());
		const focused = chance(0.5);
		const created = await call(isPrivate ? 'private-window' : 'new-window', `async (url, focused, incognito) => {
			const w = await browser.windows.create({ url, focused, ...(incognito ? { incognito: true } : {}) });
			const tabs = w.tabs ?? await browser.tabs.query({ windowId: w.id });
			return { id: w.id, incognito: w.incognito, tabs: tabs.map((t) => ({ id: t.id, windowId: t.windowId, incognito: t.incognito, pinned: t.pinned })) };
		}`, urls, focused, isPrivate);
		if (!created) return;
		if (isPrivate && !created.incognito) info.privateResults.push({ note: 'windows.create({ incognito: true }) returned a normal window' });
		addWindow(created.id, Boolean(created.incognito));
		created.tabs.forEach((t, i) => { addTab(t, urls[i]); touch(t.id); });
		step(isPrivate ? 'private-window' : 'new-window', { windowId: created.id, tabIds: created.tabs.map((t) => t.id), urls });
	}

	/** Prefer recently opened or activated tabs when requested, otherwise choose from all modeled tabs. */
	function navTarget(preferActive) {
		if (preferActive) {
			const recent = log.filter((e) => e.action === 'activate' || e.action === 'open').slice(-3).map((e) => e.tabId);
			const label = tabLabels((t) => recent.includes(t.id));
			if (label.length) return pick(label);
		}
		return pick(tabLabels());
	}

	/** Navigate a modeled tab, reset document-specific expected extras and record the new intended URL before the browser call. */
	async function navigate(label = navTarget(chance(0.5)), action = 'navigate') {
		const tab = tabs.get(label);
		if (!tab) return;
		const url = tab.private ? `${fixtureUrl()}&pv=1` : randomUrl();
		touch(tab.id);
		tab.url = url;
		tab.extras = [];
		step(action, { tabId: tab.id, url });
		await call(action, `async (id, url) => { await browser.tabs.update(id, { url }); }`, tab.id, url);
	}

	/** Activate a tab and navigate after a short seeded delay to exercise cancellation while a scan may still be running. */
	async function navigateMidScan() {
		const label = pick(tabLabels());
		const tab = tabs.get(label);
		if (!tab) return;
		await activate(label);
		await delay(50 + int(600));
		await navigate(label, 'navigate-mid-scan');
	}

	/** Use page-side location replacement to change the document without adding a navigation-history entry. */
	async function scriptReplace() {
		const label = navTarget(true);
		const tab = tabs.get(label);
		if (!tab) return;
		const url = tab.private ? `${fixtureUrl()}&pv=1` : fixtureUrl();
		touch(tab.id);
		tab.url = url;
		tab.extras = [];
		step('location-replace', { tabId: tab.id, url });
		await call('location-replace', `async (id, url) => { await browser.scripting.executeScript({ target: { tabId: id }, func: (u) => location.replace(u), args: [url] }); }`, tab.id, url);
	}

	/** Exercise back and forward navigation, then let actual tab reads resolve which history entry remains visible. */
	async function historyHop() {
		const tab = tabs.get(navTarget(true));
		if (!tab) return;
		const moves = Array.from({ length: 2 + int(5) }, () => chance(0.6) ? 'back' : 'forward');
		const gaps = moves.map(() => int(250));
		touch(tab.id);
		// Back and forward may stay inside one document (pushState entries), so a
		// rewrite's marker stays allowed.
		step('back-forward', { tabId: tab.id, moves });
		await call('back-forward', `async (id, moves, gaps) => {
			for (let i = 0; i < moves.length; i++) {
				await (moves[i] === 'back' ? browser.tabs.goBack(id) : browser.tabs.goForward(id)).catch(() => undefined);
				await new Promise((r) => setTimeout(r, gaps[i]));
			}
		}`, tab.id, moves, gaps);
		// The harness no longer knows which entry is showing; the checks read the tab's URL.
		tab.url = undefined;
	}

	/** Issue repeated reloads without waiting for each scan, using seeded gaps to expose document-lifecycle races. */
	async function reloadStorm() {
		const tab = tabs.get(navTarget(true));
		if (!tab) return;
		const n = 3 + int(5);
		const gaps = Array.from({ length: n }, () => int(200));
		touch(tab.id);
		step('reload-storm', { tabId: tab.id, n, gaps });
		await call('reload-storm', `async (id, gaps) => {
			for (const gap of gaps) {
				browser.tabs.reload(id).catch(() => undefined);
				await new Promise((r) => setTimeout(r, gap));
			}
		}`, tab.id, gaps);
	}

	/** Change the fixture URL in the MAIN world without replacing the document or clearing its sticky observations. */
	async function pushState() {
		const tab = tabs.get(navTarget(true));
		if (!tab) return;
		const path = pages.historyPath();
		touch(tab.id);
		step('push-state', { tabId: tab.id, path });
		await call('push-state', `async (id, path) => { await browser.scripting.executeScript({ target: { tabId: id }, world: 'MAIN', func: (p) => history.pushState({}, '', location.pathname + p), args: [path] }); }`, tab.id, path);
	}

	/** Replace the page markup within the same document and add the injected marker to that document's permitted findings. */
	async function replaceContents() {
		const tab = tabs.get(navTarget(true));
		if (!tab) return;
		touch(tab.id);
		tab.extras = [...new Set([...tab.extras, INJECTED_MARKER.name])];
		step('replace-contents', { tabId: tab.id });
		await call('replace-contents', `async (id, generator) => {
			await browser.scripting.executeScript({ target: { tabId: id }, world: 'MAIN', args: [generator], func: (g) => {
				document.documentElement.innerHTML = '<head><title>Replaced</title><meta name="generator" content="' + g + '"></head><body><main>' + '<p>replaced</p>'.repeat(300) + '</main></body>';
			} });
		}`, tab.id, INJECTED_MARKER.generator);
	}

	/** Duplicate a tab within the plan's capacity and treat the new document as a fresh observation owner. */
	async function duplicate() {
		const tab = tabs.get(pick(tabLabels()));
		if (!tab || tabs.size >= plan.maxTabs) return;
		const dup = await call('duplicate', `async (id) => { const t = await browser.tabs.duplicate(id); return t && { id: t.id, windowId: t.windowId, incognito: t.incognito, pinned: t.pinned, url: t.url }; }`, tab.id);
		if (!dup) return;
		const label = addTab(dup, tab.url);
		tabs.get(label).extras = [];
		touch(dup.id);
		step('duplicate', { tabId: tab.id, tabIds: [tab.id, dup.id] });
	}

	/** Toggle a modeled tab's pinned state and record the browser action for later lifecycle checks. */
	async function pin() {
		const tab = tabs.get(pick(tabLabels()));
		if (!tab) return;
		tab.pinned = !tab.pinned;
		step(tab.pinned ? 'pin' : 'unpin', { tabId: tab.id });
		await call('pin', `async (id, pinned) => { await browser.tabs.update(id, { pinned }); }`, tab.id, tab.pinned);
	}

	/** Open and close a temporary full-page panel for a normal tab without adding that surface to the inspected-tab model. */
	async function openPanel() {
		const tab = tabs.get(pick(tabLabels((t) => !t.private)));
		const w = pick(normalWindows());
		if (!tab || !w) return;
		const stay = 300 + int(3000);
		step('panel-page', { tabId: tab.id, stay });
		await call('panel-page', `async (tabId, windowId, stay) => {
			const panel = await browser.tabs.create({ windowId, url: browser.runtime.getURL('panel.html?tab=' + tabId), active: true });
			await new Promise((r) => setTimeout(r, stay));
			await browser.tabs.remove(panel.id);
		}`, tab.id, w.id, stay);
	}

	/** Exercise the host's sidebar toggle hook and retain unsupported or failed action details separately from invariants. */
	async function sidebar() {
		const index = int(4);
		step('toggle-sidebar', { index });
		try {
			await hooks.toggleSidebar(index);
		} catch (error) {
			info.actionErrors[`toggle-sidebar: ${String(error.message).slice(0, 120)}`] = (info.actionErrors[`toggle-sidebar: ${String(error.message).slice(0, 120)}`] ?? 0) + 1;
		}
	}

	/** Use the host's restore-tab action and resynchronize model identities after the browser recreates contexts. */
	async function restoreClosed() {
		step('undo-close-tab');
		try {
			await hooks.undoCloseTab();
		} catch (error) {
			info.actionErrors[`undo-close-tab: ${String(error.message).slice(0, 120)}`] = (info.actionErrors[`undo-close-tab: ${String(error.message).slice(0, 120)}`] ?? 0) + 1;
		}
		await delay(300);
		await syncModel('restored');
	}

	/** Exercise private-window creation, navigation and closure using only local fixtures and the browser's reported privacy state. */
	async function privateAction() {
		const privateWindow = [...windows.values()].find((w) => w.private);
		if (!privateWindow) return newWindow(true);
		const privateTabs = tabLabels((t) => t.private);
		if (chance(0.3)) {
			const w = privateWindow;
			const members = [...tabs.values()].filter((t) => t.windowLabel === w.label);
			for (const t of members) touch(t.id);
			step('close-window', { windowId: w.id, tabIds: members.map((t) => t.id), private: true });
			await call('close-window', `async (id) => { await browser.windows.remove(id); }`, w.id);
			for (const t of members) dropTab(t.label);
			windows.delete(w.label);
			return;
		}
		if (privateTabs.length && chance(0.6)) return navigate(pick(privateTabs), 'navigate-private');
		const url = `${fixtureUrl()}&pv=1`;
		const tab = await call('open-private', `async (windowId, url) => { const t = await browser.tabs.create({ windowId, url, active: true }); return { id: t.id, windowId: t.windowId, incognito: t.incognito, pinned: t.pinned }; }`, privateWindow.id, url);
		if (!tab) return;
		addTab(tab, url);
		touch(tab.id);
		step('open-private', { tabId: tab.id, url });
	}

	/** Reconcile the model with the browser after operations that create tabs the harness did not name. */
	async function syncModel(reason) {
		// Every tab still open, whatever it shows: a tab between documents can
		// briefly report about:blank and must not be mistaken for a closed one.
		const live = await call('sync', `async (controlWindowId) => (await browser.tabs.query({})).filter((t) => t.windowId !== controlWindowId).map((t) => ({ id: t.id, windowId: t.windowId, incognito: t.incognito, pinned: t.pinned, url: t.url || t.pendingUrl || '' }))`, control.windowId);
		if (!live) return;
		const liveIds = new Set(live.map((t) => t.id));
		for (const t of [...tabs.values()]) if (!liveIds.has(t.id)) dropTab(t.label);
		const known = new Set([...tabs.values()].map((t) => t.id));
		for (const t of live.sort((a, b) => a.id - b.id)) {
			if (known.has(t.id) || !isOurs(t.url)) continue;
			const label = addTab(t, t.url);
			touch(t.id);
			step('adopt-tab', { tabId: t.id, url: t.url, reason });
			void label;
		}
		for (const t of live.filter((x) => known.has(x.id) || isOurs(x.url))) {
			const model = [...tabs.values()].find((m) => m.id === t.id);
			if (model) {
				const w = windowLabelById(t.windowId) ?? addWindow(t.windowId, Boolean(t.incognito));
				model.windowLabel = w;
			}
		}
		for (const w of [...windows.values()]) if (![...tabs.values()].some((t) => t.windowLabel === w.label)) windows.delete(w.label);
	}

	const actions = [
		{ name: 'open', weight: 10, /** Allow another tab only while the stress plan's tab capacity has room. */ when: () => tabs.size < plan.maxTabs, run: openTab },
		{ name: 'activate', weight: 14, /** Require a modeled tab before selecting an activation target. */ when: () => tabs.size > 0, /** Choose the activation target at execution time so it reflects the current tab model. */ run: () => activate() },
		{ name: 'switch-burst', weight: 8, /** Require multiple tabs before exercising a rapid activation burst. */ when: () => tabs.size > 1, run: burst },
		{ name: 'focus-window', weight: 4, /** Offer a window-focus change only when more than one modeled window exists. */ when: () => windows.size > 1, run: focusWindow },
		{ name: 'move', weight: 6, /** Require multiple tabs before scheduling a move or reorder action. */ when: () => tabs.size > 1, run: moveTab },
		{ name: 'close-tab', weight: 6, /** Keep a reserve of modeled tabs before offering a close-tab action. */ when: () => tabs.size > 4, /** Select a close candidate at execution time using the recent-activity policy. */ run: () => closeTab() },
		{ name: 'close-window', weight: 1.5, /** Preserve the last normal window when offering a random window-close action. */ when: () => normalWindows().length > 1, run: closeWindow },
		{ name: 'new-window', weight: 2, /** Reserve both window capacity and room for the new window's possible three tabs. */ when: () => normalWindows().length < plan.maxWindows && tabs.size < plan.maxTabs - 2, /** Use the normal-window default for this action; private-window actions have their own owner. */ run: () => newWindow() },
		{ name: 'navigate', weight: 12, /** Require an existing modeled tab before offering navigation. */ when: () => tabs.size > 0, /** Select the navigation target and URL when the action executes, using the current model. */ run: () => navigate() },
		{ name: 'navigate-mid-scan', weight: 6, /** Require a tab before the activate-then-navigate race scenario. */ when: () => tabs.size > 0, run: navigateMidScan },
		{ name: 'location-replace', weight: 4, /** Require a tab before attempting page-side location replacement. */ when: () => tabs.size > 0, run: scriptReplace },
		{ name: 'back-forward', weight: 5, /** Require a tab before exercising its navigation history. */ when: () => tabs.size > 0, run: historyHop },
		{ name: 'reload-storm', weight: 3, /** Require a tab before issuing repeated reloads. */ when: () => tabs.size > 0, run: reloadStorm },
		{ name: 'push-state', weight: 4, /** Require a tab before injecting a same-document URL change. */ when: () => tabs.size > 0, run: pushState },
		{ name: 'replace-contents', weight: 4, /** Require a tab before replacing its current document markup. */ when: () => tabs.size > 0, run: replaceContents },
		{ name: 'panel-page', weight: 3, /** Require a modeled target before attempting the temporary panel-page scenario. */ when: () => tabs.size > 0, run: openPanel },
		{ name: 'toggle-sidebar', weight: 2, /** Offer sidebar toggles only when the browser harness supplies that capability. */ when: () => Boolean(hooks.toggleSidebar), run: sidebar },
		{ name: 'duplicate', weight: 2, /** Require a source tab and spare tab capacity before offering duplication. */ when: () => tabs.size > 0 && tabs.size < plan.maxTabs, run: duplicate },
		{ name: 'pin', weight: 2, /** Require an existing tab before toggling pinned state. */ when: () => tabs.size > 0, run: pin },
		{ name: 'undo-close-tab', weight: 2, /** Require a restore capability, a known closed tab and available tab capacity before undoing closure. */ when: () => Boolean(hooks.undoCloseTab) && closedTabIds.size > 0 && tabs.size < plan.maxTabs, run: restoreClosed },
		{ name: 'private', weight: 2, /** Offer private-window actions only when the browser harness declares the capability. */ when: () => Boolean(hooks.privateWindows), run: privateAction },
	];

	/** Draw from currently eligible actions using their configured weights and the run's seeded random source. */
	function chooseAction() {
		const available = actions.filter((a) => a.when());
		let r = rnd() * available.reduce((sum, a) => sum + a.weight, 0);
		for (const a of available) {
			r -= a.weight;
			if (r <= 0) return a;
		}
		return available.at(-1);
	}

	/** Execute a bounded action sequence with seeded user-like gaps; each action owns its browser operation and evidence. */
	async function act(n) {
		for (let i = 0; i < n; i++) {
			const action = chooseAction();
			await action.run();
			// Users are fast: most gaps are shorter than a scan.
			const gap = chance(0.7) ? int(150) : int(1500);
			if (gap) await delay(gap);
		}
	}

	return { call, openTab, newWindow, burst, act, syncModel };
}
