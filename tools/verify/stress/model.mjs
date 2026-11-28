/**
 * Own browser identities for one stress run. Actions mutate modeled tabs;
 * observations consume the same maps to distinguish churn from settled state.
 * Closed and private identities stay available until the final privacy checks.
 */
export function create() {
	const tabs = new Map(); // Stable replay label -> modeled tab.
	const windows = new Map(); // Stable replay label -> modeled window.
	const closedTabIds = new Map(); // Browser tab ID -> wall-clock close time in ms.
	const touchedAt = new Map(); // Browser tab ID -> disruptive-action times in ms.
	const privateTabIds = new Set(); // Includes private tabs that have since closed.
	let nextTab = 0;
	let nextWindow = 0;

	/** Assign a stable replay label to a browser window and retain its privacy context. */
	function addWindow(id, isPrivate = false) {
		const label = `W${nextWindow++}`;
		windows.set(label, { label, id, private: isPrivate });
		return label;
	}

	/** Find the model's stable window label for a browser-provided window ID. */
	function windowLabelById(id) {
		for (const w of windows.values()) if (w.id === id) return w.label;
		return undefined;
	}

	/** Register a browser tab in the stress model, creating its window owner and remembering private tab identities. */
	function addTab(tab, url) {
		const label = `T${nextTab++}`;
		let windowLabel = windowLabelById(tab.windowId);
		if (!windowLabel) windowLabel = addWindow(tab.windowId, Boolean(tab.incognito));
		if (tab.incognito) privateTabIds.add(tab.id);
		tabs.set(label, { label, id: tab.id, windowLabel, private: Boolean(tab.incognito), url: url ?? tab.url, pinned: Boolean(tab.pinned), extras: [] });
		return label;
	}

	/** Record tab closure for later checks and remove a model window only when it has no remaining modeled tabs. */
	function dropTab(label, at = Date.now()) {
		const tab = tabs.get(label);
		if (!tab) return;
		closedTabIds.set(tab.id, at);
		tabs.delete(label);
		const w = windows.get(tab.windowLabel);
		if (w && ![...tabs.values()].some((t) => t.windowLabel === w.label)) windows.delete(w.label);
	}

	/** Record when an action affected a tab so transient-state checks can distinguish active churn from settled state. */
	function touch(tabId) {
		if (!touchedAt.has(tabId)) touchedAt.set(tabId, []);
		touchedAt.get(tabId).push(Date.now());
	}

	/** Select tabs whose detector state may be inspected in persistent storage. */
	const normalTabs = () => [...tabs.values()].filter((t) => !t.private);
	/** Preserve a normal browsing context while private windows come and go. */
	const normalWindows = () => [...windows.values()].filter((w) => !w.private);
	/** Select stable labels without changing model order or consuming randomness. */
	const tabLabels = (filter = () => true) => [...tabs.values()].filter(filter).map((t) => t.label);

	return {
		tabs, windows, closedTabIds, touchedAt, privateTabIds,
		addWindow, windowLabelById, addTab, dropTab, touch,
		normalTabs, normalWindows, tabLabels,
		/** Total identities allocated, including tabs no longer open. */
		get tabsOpened() { return nextTab; },
		/** Total identities allocated, including windows no longer open. */
		get windowsOpened() { return nextWindow; },
	};
}
