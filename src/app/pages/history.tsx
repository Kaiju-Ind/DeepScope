import CompareIcon from '~icons/fluent/arrow-swap-24-regular';
import FilterIcon from '~icons/fluent/filter-24-regular';
import RefreshIcon from '~icons/fluent/arrow-clockwise-24-regular';
import { For, Show, createEffect, createMemo, createResource, createSignal } from 'solid-js';

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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/ui/empty';
import { Input } from '@/ui/input';

/** History filters that answer common investigation questions without hiding search. */
type HistoryFilterType = history.FilterType;

/** Transient history controls retained for one active tab during one panel session. */
interface HistoryStateType {
	readonly query: string;
	readonly filter: HistoryFilterType;
	readonly selected?: string;
}

/** Browse retained detector runs and surface the selected run's delta before the long run list. */
export function HistoryPage() {
	const panel = useHistory();
	const tabId = () => panel.visibleTabIdentity()?.tabId;
	const currentUrl = () => panel.analysis()?.url ?? panel.visibleTabIdentity()?.url ?? '';
	const initial = session.get<HistoryStateType>(tabId(), 'history') ?? { query: '', filter: 'all' as const };
	const [runs, { refetch }] = createResource(currentUrl, async (value) => value ? getCachedReplayTraceHistory(value) : []);
	const [query, setQuery] = createSignal(initial.query);
	const [filter, setFilter] = createSignal<HistoryFilterType>(initial.filter);
	const [selected, setSelected] = createSignal<string | undefined>(initial.selected);
	const [detailsOpen, setDetailsOpen] = createSignal(false);
	const filtered = createMemo(() => history.query(runs() ?? [], { text: query(), filter: filter(), page: currentUrl() }));
	const current = createMemo(() => history.get(filtered(), selected()) ?? filtered()[0]);
	const previous = createMemo(() => history.previous(runs() ?? [], current()));
	const comparison = createMemo(() => {
		const before = previous();
		const after = current();
		return before && after && history.key(before) !== history.key(after) ? history.compare(before, after) : undefined;
	});
	const activeFilterCount = () => filter() === 'all' ? 0 : 1;

	createEffect(() => {
		const state = session.get<HistoryStateType>(tabId(), 'history');
		if (!state) return;
		setQuery(state.query);
		setFilter(state.filter);
		setSelected(state.selected);
	});

	/** Persist only transient UI controls. Detector history remains owned by storage. */
	function save(next: Partial<HistoryStateType>): void {
		session.save(tabId(), 'history', { query: query(), filter: filter(), selected: selected(), ...next });
	}

	function setSearch(value: string): void {
		setQuery(value);
		save({ query: value });
	}

	function setRun(value: DetectionReplayTrace): void {
		const key = history.key(value);
		setSelected(key);
		save({ selected: key });
		setDetailsOpen(true);
	}

	function setHistoryFilter(value: HistoryFilterType): void {
		setFilter(value);
		save({ filter: value });
	}

	return (
		<>
			<header class="k-page-header">
				<div class="k-page-heading">
					<p class="k-page-eyebrow">Retained detector runs</p>
					<h1 class="k-page-title">History</h1>
					<p class="k-page-description">Start with what changed, then inspect the runs that produced the difference.</p>
				</div>
				<Button variant="outline" size="icon-sm" aria-label="Refresh history" disabled={runs.loading} onClick={() => void refetch()}>
					<RefreshIcon />
				</Button>
			</header>

			<Show when={comparison()} fallback={<NoComparison hasRuns={(runs()?.length ?? 0) > 0} />}>
				{(diff) => <ComparisonCard diff={diff()} />}
			</Show>

			<section aria-labelledby="history-runs-heading">
				<div class="k-category-heading">
					<h2 id="history-runs-heading" class="k-category-name">Runs</h2>
					<span class="k-category-count">{filtered().length}</span>
				</div>
				<div class="mb-3 flex items-center gap-2">
					<Input class="min-w-0 flex-1" type="search" value={query()} onInput={(event) => setSearch(event.currentTarget.value)} placeholder="Search technology, page, or run" aria-label="Search inspection history" />
					<HistoryFilter value={filter()} count={activeFilterCount()} onChange={setHistoryFilter} />
				</div>
				<Show when={filtered().length > 0} fallback={<NoHistory loading={runs.loading} />}>
					<div class="grid gap-2">
						<For each={filtered()}>{(run) => <RunRow run={run} selected={history.key(current() ?? run) === history.key(run)} onSelect={() => setRun(run)} />}</For>
					</div>
				</Show>
			</section>

			<Drawer open={detailsOpen()} onOpenChange={setDetailsOpen} side="right">
				<DrawerContent class="border-white/10 bg-kaiju-navy-deep text-white">
					<Show when={current()}>
						{(run) => (
							<>
								<DrawerHeader>
									<DrawerTitle>Inspection details</DrawerTitle>
									<DrawerDescription>{formatTime(run().analyzedAt)} · {run().resultCount} emitted technologies · {run().events.length} replay events</DrawerDescription>
								</DrawerHeader>
								<div class="grid gap-3 overflow-y-auto px-4 pb-5">
									<PageUrl value={run().target.url} mode="detail" />
									<For each={run().explanations}>{(item) => <RunTechnology item={item} />}</For>
								</div>
							</>
						)}
					</Show>
				</DrawerContent>
			</Drawer>
		</>
	);
}

/** Filter menu keeps uncommon controls out of the primary reading path. */
function HistoryFilter(props: { readonly value: HistoryFilterType; readonly count: number; readonly onChange: (value: HistoryFilterType) => void }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger as={Button} variant="outline" class="shrink-0 gap-2" aria-label="Filter history">
				<FilterIcon class="size-4" />
				<span class="hidden xs:inline">Filter</span>
				<Show when={props.count > 0}><Badge>{props.count}</Badge></Show>
			</DropdownMenuTrigger>
			<DropdownMenuContent class="min-w-56">
				<DropdownMenuLabel>Show runs</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onSelect={() => props.onChange('all')}><span class="flex-1">All pages</span><Show when={props.value === 'all'}>✓</Show></DropdownMenuItem>
				<DropdownMenuItem onSelect={() => props.onChange('page')}><span class="flex-1">Current page only</span><Show when={props.value === 'page'}>✓</Show></DropdownMenuItem>
				<DropdownMenuItem onSelect={() => props.onChange('changed')}><span class="flex-1">Runs with changes</span><Show when={props.value === 'changed'}>✓</Show></DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/** Highest-value history information appears before the long run inventory. */
function ComparisonCard(props: { readonly diff: ReturnType<typeof history.compare> }) {
	const total = () => props.diff.added.length + props.diff.removed.length + props.diff.changed.length;
	return (
		<Card size="sm" class="border-kaiju-cyan/18 bg-kaiju-cyan/[0.025]">
			<CardHeader>
				<div class="flex items-start justify-between gap-3">
					<div class="min-w-0">
						<div class="flex items-center gap-2"><CompareIcon class="size-4 shrink-0 text-kaiju-cyan" /><CardTitle>Changes from previous run</CardTitle></div>
						<CardDescription>{formatTime(props.diff.before.analyzedAt)} → {formatTime(props.diff.after.analyzedAt)}</CardDescription>
					</div>
					<Badge>{total()}</Badge>
				</div>
			</CardHeader>
			<CardContent class="grid gap-3 sm:grid-cols-3">
				<DiffGroup label="Added" items={props.diff.added.map((item) => item.name)} />
				<DiffGroup label="Removed" items={props.diff.removed.map((item) => item.name)} />
				<DiffGroup label="Changed" items={props.diff.changed.map((item) => `${item.name} · ${item.fields.join(', ')}`)} />
				<p class="text-[0.6875rem] leading-5 text-white/36 sm:col-span-3">Comparison covers emitted technologies only. Replay v1 does not persist rejected candidates.</p>
			</CardContent>
		</Card>
	);
}

/** Dense run row prioritizes host, page path, time, and result count in that order. */
function RunRow(props: { readonly run: DetectionReplayTrace; readonly selected: boolean; readonly onSelect: () => void }) {
	return (
		<button type="button" class="panel-section w-full p-3 text-left transition hover:border-kaiju-cyan/20 hover:bg-white/[0.045] focus-kaiju" data-selected={props.selected ? 'true' : 'false'} onClick={props.onSelect}>
			<div class="flex items-start justify-between gap-3">
				<PageUrl value={props.run.target.url} />
				<Badge variant="outline" class="shrink-0">{props.run.resultCount}</Badge>
			</div>
			<div class="mt-2 flex items-center justify-between gap-3">
				<p class="font-mono text-[0.625rem] text-white/36">{formatTime(props.run.analyzedAt)}</p>
				<p class="text-[0.6875rem] text-white/32">{props.run.explanations.length} emitted</p>
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

/** Compact comparison section that stays quiet when no changes exist. */
function DiffGroup(props: { readonly label: string; readonly items: readonly string[] }) {
	return (
		<div class="min-w-0">
			<p class="panel-label">{props.label} · {props.items.length}</p>
			<Show when={props.items.length > 0} fallback={<p class="mt-1 text-xs text-white/32">None</p>}>
				<ul class="mt-1 grid gap-1"><For each={props.items.slice(0, 5)}>{(item) => <li class="truncate text-xs text-white/58" title={item}>{item}</li>}</For></ul>
				<Show when={props.items.length > 5}><p class="mt-1 text-[0.6875rem] text-white/32">+{props.items.length - 5} more</p></Show>
			</Show>
		</div>
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
