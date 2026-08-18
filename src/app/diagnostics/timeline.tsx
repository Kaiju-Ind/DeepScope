import { createMediaQuery } from '@solid-primitives/media';
import { createVirtualizer } from '@tanstack/solid-virtual';
import { For, Show, createEffect, createMemo, createSignal } from 'solid-js';

import { FilterMenu } from '@/app/components/filter-menu';
import * as state from '@/app/diagnostics/state';
import type { DiagnosticRecord } from '@/lib/diagnostics/contracts';
import * as query from '@/lib/diagnostics/query';
import { Badge } from '@/ui/badge';
import {
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@/ui/dropdown-menu';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from '@/ui/drawer';
import { Input } from '@/ui/input';
import { NativeSelect, NativeSelectOption } from '@/ui/native-select';

/** Inputs required by the virtual diagnostic record list. */
export interface TimelinePropsType {
	readonly records: readonly DiagnosticRecord[];
	readonly tabId?: number;
}

/** Searchable, filtered, virtualized diagnostic record list. */
export function Timeline(props: TimelinePropsType) {
	const initial = state.get(props.tabId);
	const [search, setSearch] = createSignal(initial.search);
	const [level, setLevel] = createSignal(initial.level);
	const [surface, setSurface] = createSignal(initial.surface);
	const [order, setOrder] = createSignal<state.OrderType>(initial.order);
	const [selectedId, setSelectedId] = createSignal<string | undefined>(initial.selectedRecordId);
	const touch = createMediaQuery('(pointer: coarse), (hover: none)');
	const surfaces = createMemo(() => [...new Set(props.records.map((record) => record.surface))].sort());
	const records = createMemo(() => query.find(props.records, {
		text: search(),
		level: level(),
		surface: surface() as DiagnosticRecord['surface'] | 'all',
		order: order(),
	}));
	const selected = createMemo(() => selectedId() ? props.records.find((record) => record.id === selectedId()) : undefined);
	const filterCount = () => (level() === 'all' ? 0 : 1) + (surface() === 'all' ? 0 : 1);
	let scrollElement: HTMLDivElement | undefined;
	let restoredTabId: number | undefined;
	const virtualizer = createVirtualizer<HTMLDivElement, HTMLDivElement>({
		get count() { return records().length; },
		getScrollElement: () => scrollElement ?? null,
		estimateSize: () => 84,
		getItemKey: (index) => records()[index]?.id ?? index,
		overscan: 8,
	});
	const virtualItems = () => virtualizer.getVirtualItems();

	createEffect(() => {
		const next = state.get(props.tabId);
		setSearch(next.search);
		setLevel(next.level);
		setSurface(next.surface);
		setOrder(next.order);
		setSelectedId(next.selectedRecordId);

		if (scrollElement && restoredTabId !== props.tabId) {
			restoredTabId = props.tabId;
			globalThis.requestAnimationFrame?.(() => {
				if (scrollElement) scrollElement.scrollTop = next.timelineScrollTop;
			});
		}
	});

	/** Move filtered timelines to their first record so stale scroll offsets cannot hide results. */
	function reset(): void {
		if (scrollElement) scrollElement.scrollTop = 0;
		state.save(props.tabId, { timelineScrollTop: 0 });
	}

	/** Save a search term in the tab-scoped diagnostic session. */
	function find(value: string): void {
		state.save(props.tabId, { search: value });
		setSearch(value);
		reset();
	}

	/** Apply one or more filter dimensions while preserving all unrelated controls. */
	function filter(next: { readonly level?: string; readonly surface?: string }): void {
		if (next.level !== undefined) {
			state.save(props.tabId, { level: next.level });
			setLevel(next.level);
		}
		if (next.surface !== undefined) {
			state.save(props.tabId, { surface: next.surface });
			setSurface(next.surface);
		}
		reset();
	}

	/** Change chronology independently from filters because ordering does not remove records. */
	function sort(next: state.OrderType): void {
		state.save(props.tabId, { order: next });
		setOrder(next);
		reset();
	}

	/** Retain record identity so the detail drawer survives route changes in this tab session. */
	function select(record: DiagnosticRecord | undefined): void {
		state.save(props.tabId, { selectedRecordId: record?.id });
		setSelectedId(record?.id);
	}

	return (
		<>
			<div class="grid gap-2">
				<div class="flex items-center gap-2">
					<Input class="min-w-0 flex-1" type="search" value={search()} onInput={(event) => find(event.currentTarget.value)} placeholder="Search messages, categories, and fields" aria-label="Search diagnostic records" />
					<Filter level={level()} surface={surface()} surfaces={surfaces()} count={filterCount()} onChange={filter} />
				</div>
				<div class="flex items-center justify-between gap-3">
					<p class="font-mono text-[0.625rem] text-white/32">{records().length} matching record{records().length === 1 ? '' : 's'}</p>
					<NativeSelect size="sm" value={order()} onChange={(event) => sort(event.currentTarget.value as state.OrderType)} aria-label="Sort diagnostic records">
						<NativeSelectOption value="newest">Newest first</NativeSelectOption>
						<NativeSelectOption value="oldest">Oldest first</NativeSelectOption>
					</NativeSelect>
				</div>
			</div>

			<Show when={records().length > 0} fallback={<p class="panel-section mt-3 p-4 text-xs text-white/42">No diagnostic records match the current filters.</p>}>
				<div
					ref={(element) => {
						scrollElement = element;
						restoredTabId = props.tabId;
						globalThis.requestAnimationFrame?.(() => { element.scrollTop = state.get(props.tabId).timelineScrollTop; });
					}}
					onScroll={(event) => state.save(props.tabId, { timelineScrollTop: event.currentTarget.scrollTop })}
					class="mt-3 h-[min(34rem,65dvh)] overflow-auto rounded-xl border border-white/8 bg-black/10 [overflow-anchor:none] [contain:strict]"
					tabindex="0"
					aria-label="Diagnostic timeline"
				>
					<div class="relative w-full" style={{ height: `${virtualizer.getTotalSize()}px` }}>
						<For each={virtualItems()}>
							{(item) => {
								const record = () => records()[item.index];
								return (
									<div ref={(element) => virtualizer.measureElement(element)} data-index={item.index} class="absolute left-0 top-0 w-full px-3" style={{ transform: `translateY(${item.start}px)` }}>
										<button type="button" class="k-diagnostic-record w-full text-left focus-kaiju" onClick={() => select(record())}>
											<Record record={record()} />
										</button>
									</div>
								);
							}}
						</For>
					</div>
				</div>
			</Show>

			<Drawer open={Boolean(selected())} onOpenChange={(open) => { if (!open) select(undefined); }} side={touch() ? 'bottom' : 'right'}>
				<DrawerContent class="border-white/10 bg-kaiju-navy-deep text-white">
					<Show when={selected()}>{(record) => <Detail record={record()} />}</Show>
				</DrawerContent>
			</Drawer>
		</>
	);
}

/** Filter severity and runtime surface without crowding the primary search control. */
function Filter(props: { readonly level: string; readonly surface: string; readonly surfaces: readonly DiagnosticRecord['surface'][]; readonly count: number; readonly onChange: (next: { readonly level?: string; readonly surface?: string }) => void }) {
	return (
		<FilterMenu label="Filter diagnostics" count={props.count}>
			<DropdownMenuLabel>Severity</DropdownMenuLabel>
			<For each={['all', 'warning', 'error', 'fatal', 'info', 'debug', 'trace']}>{(value) => <DropdownMenuItem onSelect={() => props.onChange({ level: value })}><span class="flex-1">{levelLabel(value)}</span><Show when={props.level === value}>✓</Show></DropdownMenuItem>}</For>
			<DropdownMenuSeparator />
			<DropdownMenuLabel>Runtime surface</DropdownMenuLabel>
			<DropdownMenuItem onSelect={() => props.onChange({ surface: 'all' })}><span class="flex-1">All surfaces</span><Show when={props.surface === 'all'}>✓</Show></DropdownMenuItem>
			<For each={props.surfaces}>{(value) => <DropdownMenuItem onSelect={() => props.onChange({ surface: value })}><span class="flex-1">{value}</span><Show when={props.surface === value}>✓</Show></DropdownMenuItem>}</For>
		</FilterMenu>
	);
}

/** Convert a stored LogTape level into a concise menu label. */
function levelLabel(value: string): string {
	if (value === 'all') return 'All levels';
	return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Full structured record shown in the adaptive detail drawer. */
function Detail(props: { readonly record: DiagnosticRecord }) {
	return (
		<>
			<DrawerHeader><DrawerTitle>{props.record.level.toUpperCase()} diagnostic</DrawerTitle><DrawerDescription>{props.record.surface} · {new Date(props.record.timestamp).toLocaleString()}</DrawerDescription></DrawerHeader>
			<div class="grid gap-4 p-4 pt-0">
				<div><p class="panel-label">Message</p><p class="mt-1 text-sm leading-6 text-white/72">{props.record.message}</p></div>
				<div><p class="panel-label">Category</p><p class="mt-1 break-all font-mono text-[0.6875rem] text-white/52">{props.record.category.join('.')}</p></div>
				<div><p class="panel-label">Context</p><p class="mt-1 break-all font-mono text-[0.6875rem] text-white/52">{props.record.contextId}</p></div>
				<Show when={(props.record.repeatCount ?? 1) > 1}><div><p class="panel-label">Repeated</p><p class="mt-1 text-xs text-white/52">{props.record.repeatCount} equivalent records summarized from {props.record.firstTimestamp ? new Date(props.record.firstTimestamp).toLocaleTimeString() : 'an earlier time'}.</p></div></Show>
				<div><p class="panel-label">Structured fields</p><pre class="k-code mt-2 whitespace-pre-wrap">{JSON.stringify(props.record.properties, null, 2)}</pre></div>
			</div>
		</>
	);
}

/** Compact record content used by each dynamically measured virtual row. */
function Record(props: { readonly record: DiagnosticRecord }) {
	return (
		<>
			<div class="flex flex-wrap items-center gap-2"><Badge variant={badge(props.record)}>{props.record.level}</Badge><span class="font-mono text-[0.625rem] text-white/32">{props.record.surface}</span><Show when={(props.record.repeatCount ?? 1) > 1}><Badge variant="outline">×{props.record.repeatCount}</Badge></Show><time class="k-diagnostic-time ml-auto">{new Date(props.record.timestamp).toLocaleTimeString()}</time></div>
			<p class="k-diagnostic-message line-clamp-2">{props.record.message}</p>
		</>
	);
}

/** Map LogTape severity to the existing badge vocabulary. */
function badge(record: DiagnosticRecord): 'default' | 'secondary' | 'destructive' | 'outline' {
	if (record.level === 'error' || record.level === 'fatal') return 'destructive';
	if (record.level === 'warning') return 'default';
	if (record.level === 'info') return 'secondary';
	return 'outline';
}
