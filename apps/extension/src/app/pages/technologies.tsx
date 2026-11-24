import RefreshIcon from '~icons/fluent/arrow-clockwise-24-regular';
import { Link } from '@tanstack/solid-router';
import { For, Show, createEffect, createMemo, createSignal } from 'solid-js';

import { AnalysisProgress } from '@/app/components/analysis-progress';
import { FilterMenu } from '@/app/components/filter-menu';
import { useTechnologies } from '@/app/context';
import * as session from '@/app/session';
import type { SiteAnalysis } from '@/lib/detection/types';
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card, CardContent } from '@/ui/card';
import {
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@/ui/dropdown-menu';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/ui/empty';
import { Input } from '@/ui/input';
import { NativeSelect, NativeSelectOption } from '@/ui/native-select';
import { Skeleton } from '@/ui/skeleton';
import { ToggleGroup, ToggleGroupItem } from '@/ui/toggle-group';

/** Technology result displayed by the current analysis. */
type TechnologyResultType = SiteAnalysis['results'][number];

/** Supported result layouts. */
type TechnologyViewType = 'list' | 'cards' | 'groups';

/** Return whether a toggle value names one supported technology layout. */
function isTechnologyView(value: string | null): value is TechnologyViewType {
	return value === 'list' || value === 'cards' || value === 'groups';
}

/** Supported result ordering policies. */
type TechnologySortType = 'name' | 'evidence' | 'confidence';

/** Confidence filter for results where the user wants only stronger evidence. */
type ConfidenceFilterType = 'all' | 'high';

/** Transient controls retained for one tab during one mounted side-panel session. */
interface TechnologyStateType {
	readonly query: string;
	readonly category: string;
	readonly confidence: ConfidenceFilterType;
	readonly newOnly: boolean;
	readonly sort: TechnologySortType;
	readonly view: TechnologyViewType;
}

const defaultState: TechnologyStateType = {
	query: '',
	category: 'all',
	confidence: 'all',
	newOnly: false,
	sort: 'name',
	view: 'list',
};

/** Primary extension view for finding and comparing technologies on the active tab. */
export function TechnologiesPage() {
	const technologies = useTechnologies();
	const tabId = () => technologies.visibleTabIdentity()?.tabId;
	const initial = session.get<TechnologyStateType>(tabId(), 'technologies') ?? defaultState;
	const [query, setQuery] = createSignal(initial.query);
	const [category, setCategory] = createSignal(initial.category);
	const [confidence, setConfidence] = createSignal<ConfidenceFilterType>(initial.confidence);
	const [newOnly, setNewOnly] = createSignal(initial.newOnly);
	const [sort, setSort] = createSignal<TechnologySortType>(initial.sort);
	const [view, setView] = createSignal<TechnologyViewType>(initial.view);
	const count = () => technologies.analysis()?.results.length ?? 0;
	const categories = createMemo(() => technologies.groupedResults().map((group) => ({ id: group.category, label: group.label })));
	const filters = () => (category() === 'all' ? 0 : 1) + (confidence() === 'all' ? 0 : 1) + (newOnly() ? 1 : 0);
	const results = createMemo(() => filterResults(technologies.analysis()?.results ?? [], { query: query(), category: category(), confidence: confidence(), newOnly: newOnly(), sort: sort(), lateIds: technologies.lateAddedIds() }));
	const grouped = createMemo(() => technologies.groupedResults()
		.map((group) => ({ ...group, results: filterResults(group.results, { query: query(), category: category(), confidence: confidence(), newOnly: newOnly(), sort: sort(), lateIds: technologies.lateAddedIds() }) }))
		.filter((group) => group.results.length > 0));

	/** Save one control change without moving detector-owned analysis state. */
	function save(next: Partial<TechnologyStateType>): void {
		session.save(tabId(), 'technologies', { query: query(), category: category(), confidence: confidence(), newOnly: newOnly(), sort: sort(), view: view(), ...next });
	}

	createEffect(() => {
		const state = session.get<TechnologyStateType>(tabId(), 'technologies') ?? defaultState;
		setQuery(state.query);
		setCategory(state.category);
		setConfidence(state.confidence);
		setNewOnly(state.newOnly);
		setSort(state.sort);
		setView(state.view);
	});

	return (
		<>
			<header class="k-page-header">
				<div class="k-page-heading">
					<p class="k-page-eyebrow">Current tab</p>
					<h1 class="k-page-title">Technologies</h1>
					<p class="k-page-description">
						{technologies.analysis()?.hostname ?? technologies.visibleTabIdentity()?.hostname ?? 'Open an HTTP or HTTPS page to inspect it.'}
					</p>
				</div>
				<Button variant="outline" size="icon-sm" aria-label="Refresh technology analysis" disabled={technologies.busy()} onClick={() => void technologies.refresh()}>
					<RefreshIcon />
				</Button>
			</header>

			<div class="flex flex-wrap items-center gap-2">
				<Badge>{count()} {count() === 1 ? 'technology' : 'technologies'}</Badge>
				<Show when={technologies.analysis()}>{(analysis) => <Badge variant="outline">{analysis().source}</Badge>}</Show>
				<Show when={technologies.liveUpdateMode() === 'active'}><Badge variant="secondary">Observing</Badge></Show>
			</div>

			<Show when={technologies.analysisActivity().busy}><AnalysisProgress activity={technologies.analysisActivity()} /></Show>
			<Show when={technologies.errorMessage()}>{(message) => <Alert variant="destructive"><AlertTitle>Analysis failed</AlertTitle><AlertDescription>{message()}</AlertDescription></Alert>}</Show>
			<Show when={technologies.notice()}>{(notice) => <Alert><AlertTitle>{notice().variant === 'success' ? 'Analysis updated' : 'Analysis status'}</AlertTitle><AlertDescription>{notice().text}</AlertDescription></Alert>}</Show>
			<Show when={technologies.liveUpdateMode() === 'active'}><Alert><AlertTitle>{technologies.lateAddedIds().length > 0 ? 'New technologies arrived' : 'Watching for more technologies'}</AlertTitle><AlertDescription>{technologies.lateAddedIds().length > 0 ? `${technologies.lateAddedIds().length} result${technologies.lateAddedIds().length === 1 ? '' : 's'} were detected after the initial scan and are marked New below.` : 'DeepScope is still observing this page for late-loaded technology evidence.'}</AlertDescription></Alert></Show>

			<Show when={technologies.analysis()} fallback={technologies.analysisActivity().busy ? <TechnologyListSkeleton /> : <NoAnalysis />}>
				{(analysis) => (
					<Show when={analysis().results.length > 0} fallback={<NoTechnologies />}>
						<div class="panel-section grid gap-2 p-3">
							<div class="flex items-center gap-2">
								<Input class="min-w-0 flex-1" type="search" value={query()} onInput={(event) => { const value = event.currentTarget.value; setQuery(value); save({ query: value }); }} placeholder="Search technologies" aria-label="Search detected technologies" />
								<TechnologyFilter categories={categories()} category={category()} confidence={confidence()} newOnly={newOnly()} count={filters()} onCategory={(value) => { setCategory(value); save({ category: value }); }} onConfidence={(value) => { setConfidence(value); save({ confidence: value }); }} onNewOnly={(value) => { setNewOnly(value); save({ newOnly: value }); }} />
							</div>
							<NativeSelect size="sm" value={sort()} onChange={(event) => { const value = event.currentTarget.value as TechnologySortType; setSort(value); save({ sort: value }); }} aria-label="Sort technologies">
								<NativeSelectOption value="name">Name</NativeSelectOption>
								<NativeSelectOption value="evidence">Most evidence</NativeSelectOption>
								<NativeSelectOption value="confidence">Confidence</NativeSelectOption>
							</NativeSelect>
							<ToggleGroup value={view()} onChange={(value) => { if (!isTechnologyView(value)) return; setView(value); save({ view: value }); }} variant="outline" size="sm" class="w-full" aria-label="Technology view">
								<ToggleGroupItem value="list" class="flex-1">List</ToggleGroupItem>
								<ToggleGroupItem value="cards" class="flex-1">Cards</ToggleGroupItem>
								<ToggleGroupItem value="groups" class="flex-1">Groups</ToggleGroupItem>
							</ToggleGroup>
						</div>

						<Show when={results().length > 0} fallback={<NoMatches />}>
							<Show when={view() === 'groups'} fallback={<TechnologyCollection results={results()} view={view()} lateIds={technologies.lateAddedIds()} />}>
								<div class="grid gap-5">
									<For each={grouped()}>
										{(group) => (
											<section>
												<div class="k-category-heading"><h2 class="k-category-name">{group.label}</h2><span class="k-category-count tabular-nums">{group.results.length}</span></div>
												<TechnologyCollection results={group.results} view="list" lateIds={technologies.lateAddedIds()} />
											</section>
										)}
									</For>
								</div>
							</Show>
						</Show>
					</Show>
				)}
			</Show>
		</>
	);
}

/** Render result cards without coupling filtering rules to presentation. */
function TechnologyCollection(props: { readonly results: readonly TechnologyResultType[]; readonly view: TechnologyViewType; readonly lateIds: readonly string[] }) {
	return (
		<div class={props.view === 'cards' ? 'grid gap-2 sm:grid-cols-2' : 'k-card-list'}>
			<For each={props.results}>{(result) => <TechnologyLink result={result} late={props.lateIds.includes(result.technologyId)} card={props.view === 'cards'} />}</For>
		</div>
	);
}

/** One route-backed technology result in either dense or card layout. */
function TechnologyLink(props: { readonly result: TechnologyResultType; readonly late: boolean; readonly card: boolean }) {
	return (
		<Link to="/technology/$technologyId" params={{ technologyId: props.result.technologyId }} class={props.card ? 'panel-section block p-4 transition-[background-color,border-color] duration-150 hover:border-kaiju-cyan/20 hover:bg-white/[0.045] focus-kaiju' : 'k-tech-row'}>
			<div class="min-w-0 flex-1">
				<div class="flex min-w-0 items-center gap-2">
					<p class="k-tech-title">{props.result.name}</p>
					<Show when={props.late}><Badge variant="outline">New</Badge></Show>
				</div>
				<div class="k-tech-meta">
					<Show when={props.result.version}><span>v{props.result.version}</span></Show>
					<span>{props.result.evidence.length} {props.result.evidence.length === 1 ? 'signal' : 'signals'}</span>
					<span>{props.result.confidence.level}</span>
				</div>
				<Show when={props.card}><p class="mt-3 text-xs leading-5 text-white/42">{props.result.categories.join(' · ')}</p></Show>
			</div>
		</Link>
	);
}

/** Apply search, category, confidence, change-state, and sort policy without mutating detector results. */
function filterResults(results: readonly TechnologyResultType[], options: { readonly query: string; readonly category: string; readonly confidence: ConfidenceFilterType; readonly newOnly: boolean; readonly sort: TechnologySortType; readonly lateIds: readonly string[] }): TechnologyResultType[] {
	const search = options.query.trim().toLocaleLowerCase();
	const filtered = results.filter((result) => {
		if (options.category !== 'all' && !result.categories.includes(options.category as TechnologyResultType['categories'][number])) return false;
		if (options.confidence === 'high' && result.confidence.level !== 'high' && result.confidence.level !== 'certain') return false;
		if (options.newOnly && !options.lateIds.includes(result.technologyId)) return false;
		if (!search) return true;
		return [result.name, result.technologyId, result.version ?? '', ...result.categories].some((value) => value.toLocaleLowerCase().includes(search));
	});

	return [...filtered].sort((left, right) => {
		if (options.sort === 'evidence') return right.evidence.length - left.evidence.length || left.name.localeCompare(right.name);
		if (options.sort === 'confidence') return right.confidence.value - left.confidence.value || left.name.localeCompare(right.name);
		return left.name.localeCompare(right.name);
	});
}

/** Explicit filter menu separates filtering from ordering and view layout. */
function TechnologyFilter(props: { readonly categories: readonly { readonly id: string; readonly label: string }[]; readonly category: string; readonly confidence: ConfidenceFilterType; readonly newOnly: boolean; readonly count: number; readonly onCategory: (value: string) => void; readonly onConfidence: (value: ConfidenceFilterType) => void; readonly onNewOnly: (value: boolean) => void }) {
	return (
		<FilterMenu label="Filter technologies" count={props.count}>
			<DropdownMenuGroup>
				<DropdownMenuLabel>Evidence</DropdownMenuLabel>
				<DropdownMenuItem onSelect={() => props.onConfidence('all')}><span class="flex-1">Any confidence</span><Show when={props.confidence === 'all'}>✓</Show></DropdownMenuItem>
				<DropdownMenuItem onSelect={() => props.onConfidence('high')}><span class="flex-1">High or certain</span><Show when={props.confidence === 'high'}>✓</Show></DropdownMenuItem>
				<DropdownMenuItem onSelect={() => props.onNewOnly(!props.newOnly)}><span class="flex-1">New this inspection</span><Show when={props.newOnly}>✓</Show></DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuLabel>Category</DropdownMenuLabel>
				<DropdownMenuItem onSelect={() => props.onCategory('all')}><span class="flex-1">All categories</span><Show when={props.category === 'all'}>✓</Show></DropdownMenuItem>
				<For each={props.categories}>{(item) => <DropdownMenuItem onSelect={() => props.onCategory(item.id)}><span class="flex-1">{item.label}</span><Show when={props.category === item.id}>✓</Show></DropdownMenuItem>}</For>
			</DropdownMenuGroup>
		</FilterMenu>
	);
}

/** Skeleton used only while the first analysis is still unavailable. */
function TechnologyListSkeleton() {
	return <Card size="sm" aria-label="Loading technology findings"><CardContent class="grid gap-3 pt-4"><Skeleton class="h-3 w-28" /><For each={[0, 1, 2, 3]}>{() => <Skeleton class="h-16 w-full rounded-xl" />}</For></CardContent></Card>;
}

/** Empty state shown before any active-page analysis exists. */
function NoAnalysis() {
	return <Empty class="panel-section min-h-48 p-6"><EmptyHeader><EmptyTitle>No site analysis yet</EmptyTitle><EmptyDescription>DeepScope inspects the active page when this panel opens or when you press Refresh.</EmptyDescription></EmptyHeader></Empty>;
}

/** Empty state for a completed analysis with no emitted technologies. */
function NoTechnologies() {
	return <Empty class="panel-section min-h-48 p-6"><EmptyHeader><EmptyTitle>No technologies detected</EmptyTitle><EmptyDescription>The current evidence does not match a registry technology yet.</EmptyDescription></EmptyHeader></Empty>;
}

/** Empty state for filters that exclude every current result. */
function NoMatches() {
	return <Empty class="panel-section min-h-32 p-5"><EmptyHeader><EmptyTitle>No matching technologies</EmptyTitle><EmptyDescription>Change the search or filters to broaden the current view.</EmptyDescription></EmptyHeader></Empty>;
}
