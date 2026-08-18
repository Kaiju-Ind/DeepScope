import CompareIcon from '~icons/fluent/arrow-swap-24-regular';
import RefreshIcon from '~icons/fluent/arrow-clockwise-24-regular';
import { createMediaQuery } from '@solid-primitives/media';
import { For, Show, createEffect, createMemo, createResource, createSignal } from 'solid-js';

import { FilterMenu } from '@/app/components/filter-menu';
import { PageUrl } from '@/app/components/page-url';
import { useHistory } from '@/app/context';
import * as session from '@/app/session';
import * as history from '@/lib/history';
import type { DetectionReplayTrace } from '@/lib/pipeline';
import { getCachedReplayTraceHistory } from '@/lib/storage';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/ui/drawer';
import {
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@/ui/dropdown-menu';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/ui/empty';
import { Input } from '@/ui/input';

/** Transient history controls retained for one active tab during one panel session. */
interface HistoryStateType {
	readonly query: string;
	readonly scope: history.HistoryScopeType;
	readonly change: history.HistoryChangeFilterType;
	readonly selected?: string;
	readonly detailsOpen: boolean;
	readonly comparisonOpen: boolean;
}

const defaultState: HistoryStateType = {
	query: '',
	scope: 'page',
	change: 'any',
	detailsOpen: false,
	comparisonOpen: false,
};

/** Browse retained detector runs with the useful same-page difference before the run inventory. */
export function HistoryPage() {
	const panel = useHistory();
	const touch = createMediaQuery('(pointer: coarse), (hover: none)');
	const tabId = () => panel.visibleTabIdentity()?.tabId;
	const currentUrl = () => panel.analysis()?.url ?? panel.visibleTabIdentity()?.url ?? '';
	const initial = session.get<HistoryStateType>(tabId(), 'history') ?? defaultState;
	const [runs, { refetch }] = createResource(currentUrl, async (value) => value ? getCachedReplayTraceHistory(value) : []);
	const [query, setQuery] = createSignal(initial.query);
	const [scope, setScope] = createSignal<history.HistoryScopeType>(initial.scope);
	const [change, setChange] = createSignal<history.HistoryChangeFilterType>(initial.change);
	const [selected, setSelected] = createSignal<string | undefined>(initial.selected);
	const [detailsOpen, setDetailsOpen] = createSignal(initial.detailsOpen);
	const [comparisonOpen, setComparisonOpen] = createSignal(initial.comparisonOpen);
	const filtered = createMemo(() => history.query(runs() ?? [], { text: query(), scope: scope(), change: change(), page: currentUrl() }));
	const latest = createMemo(() => history.query(runs() ?? [], { scope: 'page', page: currentUrl() })[0]);
	const current = createMemo(() => history.get(runs() ?? [], selected()) ?? latest() ?? runs()?.[0]);
	const previous = createMemo(() => history.previous(runs() ?? [], latest()));
	const comparison = createMemo(() => {
		const before = previous();
		const after = latest();
		return before && after && history.key(before) !== history.key(after) ? history.compare(before, after) : undefined;
	});
	const filterCount = () => (scope() === 'page' ? 0 : 1) + (change() === 'any' ? 0 : 1);

	createEffect(() => {
		const state = session.get<HistoryStateType>(tabId(), 'history') ?? defaultState;
		setQuery(state.query);
		setScope(state.scope);
		setChange(state.change);
		setSelected(state.selected);
		setDetailsOpen(state.detailsOpen);
		setComparisonOpen(state.comparisonOpen);
	});

	/** Persist only transient UI controls. Detector history remains owned by storage. */
	function save(next: Partial<HistoryStateType>): void {
		session.save(tabId(), 'history', {
			query: query(),
			scope: scope(),
			change: change(),
			selected: selected(),
			detailsOpen: detailsOpen(),
			comparisonOpen: comparisonOpen(),
			...next,
		});
	}

	function search(value: string): void {
		setQuery(value);
		save({ query: value });
	}

	function select(run: DetectionReplayTrace): void {
		const runKey = history.key(run);
		setSelected(runKey);
		setDetailsOpen(true);
		save({ selected: runKey, detailsOpen: true });
	}

	function showDetails(open: boolean): void {
		setDetailsOpen(open);
		save({ detailsOpen: open });
	}

	function showComparison(open: boolean): void {
		setComparisonOpen(open);
		save({ comparisonOpen: open });
	}

	return (
		<>
			<header class="k-page-header">
				<div class="k-page-heading">
					<p class="k-page-eyebrow">Retained detector runs</p>
					<h1 class="k-page-title">History</h1>
					<p class="k-page-description">Start with changes on this page. Expand to the rest of the origin only when you need to investigate further.</p>
				</div>
				<Button variant="outline" size="icon-sm" aria-label="Refresh history" disabled={runs.loading} onClick={() => void refetch()}>
					<RefreshIcon />
				</Button>
			</header>

			<Show when={comparison()} fallback={<NoComparison hasRuns={(runs()?.length ?? 0) > 0} />}>
				{(diff) => <ComparisonCard diff={diff()} onOpen={() => showComparison(true)} />}
			</Show>

			<section aria-labelledby="history-runs-heading">
				<div class="k-category-heading">
					<h2 id="history-runs-heading" class="k-category-name">Runs</h2>
					<span class="k-category-count tabular-nums">{filtered().length}</span>
				</div>
				<div class="mb-3 flex items-center gap-2">
					<Input class="min-w-0 flex-1" type="search" value={query()} onInput={(event) => search(event.currentTarget.value)} placeholder="Search technology, path, or run" aria-label="Search inspection history" />
					<HistoryFilter
						scope={scope()}
						change={change()}
						count={filterCount()}
						onScope={(value) => { setScope(value); save({ scope: value }); }}
						onChange={(value) => { setChange(value); save({ change: value }); }}
					/>
				</div>
				<Show when={filtered().length > 0} fallback={<NoHistory loading={runs.loading} />}>
					<div class="grid gap-2">
						<For each={filtered()}>{(run) => <RunRow run={run} showUrl={scope() === 'origin'} selected={history.key(current() ?? run) === history.key(run)} onSelect={() => select(run)} />}</For>
					</div>
				</Show>
			</section>

			<Drawer open={detailsOpen()} onOpenChange={showDetails} side={touch() ? 'bottom' : 'right'}>
				<DrawerContent class="border-white/10 bg-kaiju-navy-deep text-white">
					<Show when={current()}>
						{(run) => (
							<>
								<DrawerHeader>
									<DrawerTitle>Inspection details</DrawerTitle>
									<DrawerDescription>{formatTime(run().analyzedAt)} · {run().resultCount} emitted technologies · {run().events.length} replay events</DrawerDescription>
								</DrawerHeader>
								<div class="grid gap-3 overflow-y-auto px-4 pb-5">
									<PageUrl value={run().target.url} mode="detail" focus="path" />
									<For each={run().explanations}>{(item) => <RunTechnology item={item} />}</For>
								</div>
							</>
						)}
					</Show>
				</DrawerContent>
			</Drawer>

			<Drawer open={comparisonOpen()} onOpenChange={showComparison} side={touch() ? 'bottom' : 'right'}>
				<DrawerContent class="border-white/10 bg-kaiju-navy-deep text-white">
					<Show when={comparison()}>{(diff) => <ComparisonDetail diff={diff()} />}</Show>
				</DrawerContent>
			</Drawer>
		</>
	);
}

/** Filter page scope and difference type independently. */
function HistoryFilter(props: {
	readonly scope: history.HistoryScopeType;
	readonly change: history.HistoryChangeFilterType;
	readonly count: number;
	readonly onScope: (value: history.HistoryScopeType) => void;
	readonly onChange: (value: history.HistoryChangeFilterType) => void;
}) {
	return (
		<FilterMenu label="Filter history" count={props.count}>
			<DropdownMenuLabel>Pages</DropdownMenuLabel>
			<DropdownMenuItem onSelect={() => props.onScope('page')}><span class="flex-1">Current page only</span><Show when={props.scope === 'page'}>✓</Show></DropdownMenuItem>
			<DropdownMenuItem onSelect={() => props.onScope('origin')}><span class="flex-1">All pages on this origin</span><Show when={props.scope === 'origin'}>✓</Show></DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuLabel>Changes</DropdownMenuLabel>
			<DropdownMenuItem onSelect={() => props.onChange('any')}><span class="flex-1">Any run</span><Show when={props.change === 'any'}>✓</Show></DropdownMenuItem>
			<DropdownMenuItem onSelect={() => props.onChange('changed')}><span class="flex-1">Any difference</span><Show when={props.change === 'changed'}>✓</Show></DropdownMenuItem>
			<DropdownMenuItem onSelect={() => props.onChange('added')}><span class="flex-1">Technology added</span><Show when={props.change === 'added'}>✓</Show></DropdownMenuItem>
			<DropdownMenuItem onSelect={() => props.onChange('removed')}><span class="flex-1">Technology removed</span><Show when={props.change === 'removed'}>✓</Show></DropdownMenuItem>
			<DropdownMenuItem onSelect={() => props.onChange('modified')}><span class="flex-1">Version, evidence, or confidence changed</span><Show when={props.change === 'modified'}>✓</Show></DropdownMenuItem>
		</FilterMenu>
	);
}

/** High-value history information stays compact and above the long run inventory. */
function ComparisonCard(props: { readonly diff: ReturnType<typeof history.compare>; readonly onOpen: () => void }) {
	const total = () => props.diff.added.length + props.diff.removed.length + props.diff.changed.length;
	return (
		<Card size="sm" class="border-kaiju-cyan/18 bg-kaiju-cyan/[0.025]">
			<CardHeader>
				<div class="flex items-start justify-between gap-3">
					<div class="min-w-0">
						<div class="flex items-center gap-2"><CompareIcon class="size-4 shrink-0 text-kaiju-cyan" /><CardTitle>Changes from previous run</CardTitle></div>
						<CardDescription>{formatTime(props.diff.before.analyzedAt)} → {formatTime(props.diff.after.analyzedAt)}</CardDescription>
					</div>
					<Badge class="tabular-nums">{total()}</Badge>
				</div>
			</CardHeader>
			<CardContent class="grid gap-3">
				<PageUrl value={props.diff.after.target.url} focus="path" />
				<div class="grid grid-cols-3 gap-2">
					<DiffCount label="Added" value={props.diff.added.length} />
					<DiffCount label="Removed" value={props.diff.removed.length} />
					<DiffCount label="Changed" value={props.diff.changed.length} />
				</div>
				<DiffHighlights diff={props.diff} />
				<div class="flex items-center justify-between gap-3">
					<p class="text-[0.6875rem] leading-5 text-white/36">Emitted technologies only. Replay v1 does not persist rejected candidates.</p>
					<Show when={total() > 0}><Button size="sm" variant="outline" class="shrink-0" onClick={props.onOpen}>View changes</Button></Show>
				</div>
			</CardContent>
		</Card>
	);
}

/** Three glanceable difference counts before any technology names. */
function DiffCount(props: { readonly label: string; readonly value: number }) {
	return <div class="rounded-lg bg-white/[0.035] px-2.5 py-2"><p class="panel-label">{props.label}</p><p class="mt-1 text-base font-semibold tabular-nums text-white">{props.value}</p></div>;
}

/** Show only the first useful examples so the comparison does not become another long list. */
function DiffHighlights(props: { readonly diff: ReturnType<typeof history.compare> }) {
	const items = () => [
		...props.diff.added.slice(0, 2).map((item) => `Added · ${item.name}`),
		...props.diff.removed.slice(0, 2).map((item) => `Removed · ${item.name}`),
		...props.diff.changed.slice(0, 2).map((item) => `Changed · ${item.name}`),
	].slice(0, 4);
	return <Show when={items().length > 0}><ul class="grid gap-1"><For each={items()}>{(item) => <li class="truncate text-xs text-white/58" title={item}>{item}</li>}</For></ul></Show>;
}

/** Full selected-run difference lives in a drawer instead of extending the History page. */
function ComparisonDetail(props: { readonly diff: ReturnType<typeof history.compare> }) {
	return (
		<>
			<DrawerHeader>
				<DrawerTitle>Technology changes</DrawerTitle>
				<DrawerDescription>{formatTime(props.diff.before.analyzedAt)} → {formatTime(props.diff.after.analyzedAt)}</DrawerDescription>
			</DrawerHeader>
			<div class="grid gap-5 overflow-y-auto px-4 pb-5">
				<PageUrl value={props.diff.after.target.url} mode="detail" focus="path" />
				<DiffGroup label="Added" items={props.diff.added.map((item) => item.name)} />
				<DiffGroup label="Removed" items={props.diff.removed.map((item) => item.name)} />
				<DiffGroup label="Changed" items={props.diff.changed.map((item) => `${item.name} · ${item.fields.join(', ')}`)} />
			</div>
		</>
	);
}

/** Dense run row prioritizes route identity, time, and emitted count. */
function RunRow(props: { readonly run: DetectionReplayTrace; readonly showUrl: boolean; readonly selected: boolean; readonly onSelect: () => void }) {
	return (
		<button type="button" class="panel-section w-full p-3 text-left transition-[background-color,border-color] duration-150 hover:border-kaiju-cyan/20 hover:bg-white/[0.045] focus-kaiju" data-selected={props.selected ? 'true' : 'false'} onClick={props.onSelect}>
			<div class="flex min-w-0 items-start justify-between gap-3">
				<div class="min-w-0 flex-1">
					<p class="text-sm font-medium tabular-nums text-white/78">{formatTime(props.run.analyzedAt)}</p>
					<Show when={props.showUrl}><div class="mt-1.5"><PageUrl value={props.run.target.url} focus="path" /></div></Show>
				</div>
				<Badge variant="outline" class="shrink-0 tabular-nums">{props.run.resultCount}</Badge>
			</div>
			<div class="mt-2 flex items-center justify-between gap-3 text-[0.6875rem] text-white/32">
				<p>{props.run.explanations.length} emitted</p>
				<p class="font-mono">{props.run.events.length} replay events</p>
			</div>
		</button>
	);
}

/** One emitted technology persisted in a replay trace. */
function RunTechnology(props: { readonly item: DetectionReplayTrace['explanations'][number] }) {
	return (
		<div class="rounded-lg border border-white/8 bg-white/[0.025] px-3 py-2.5">
			<div class="flex items-center justify-between gap-3"><span class="text-xs font-medium text-white/72">{props.item.name}</span><Badge variant="outline">{props.item.confidence.level}</Badge></div>
			<p class="mt-1 text-[0.6875rem] text-white/38">{props.item.version ? `v${props.item.version} · ` : ''}{props.item.evidenceCount} evidence item{props.item.evidenceCount === 1 ? '' : 's'}</p>
		</div>
	);
}

/** Comparison list that stays readable for long technology names. */
function DiffGroup(props: { readonly label: string; readonly items: readonly string[] }) {
	return (
		<section>
			<p class="panel-label">{props.label} · {props.items.length}</p>
			<Show when={props.items.length > 0} fallback={<p class="mt-1 text-xs text-white/32">None</p>}>
				<ul class="mt-2 grid gap-2"><For each={props.items}>{(item) => <li class="rounded-lg bg-white/[0.025] px-3 py-2 text-xs leading-5 text-white/62 [overflow-wrap:anywhere]">{item}</li>}</For></ul>
			</Show>
		</section>
	);
}

/** Empty comparison state still explains why the high-priority area is quiet. */
function NoComparison(props: { readonly hasRuns: boolean }) {
	return props.hasRuns ? <div class="panel-section px-4 py-3 text-xs text-white/42">No older retained run for this same page is available to compare.</div> : null;
}

/** Empty state distinguishes loading from an origin with no retained runs. */
function NoHistory(props: { readonly loading: boolean }) {
	return (
		<Empty class="panel-section min-h-44 p-6">
			<EmptyHeader>
				<EmptyTitle>{props.loading ? 'Reading history' : 'No matching history'}</EmptyTitle>
				<EmptyDescription>{props.loading ? 'Loading detector replay receipts for the current origin.' : 'Change the search or filter, or run an inspection on this origin.'}</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}

/** Format a persisted run time without implying a different time zone. */
function formatTime(timestamp: number): string {
	return new Date(timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
}
