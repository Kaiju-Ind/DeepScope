import CopyIcon from '~icons/fluent/copy-24-regular';
import FilterIcon from '~icons/fluent/filter-24-regular';
import RefreshIcon from '~icons/fluent/arrow-clockwise-24-regular';
import WarningIcon from '~icons/fluent/warning-24-regular';
import { createMediaQuery } from '@solid-primitives/media';
import { createVirtualizer } from '@tanstack/solid-virtual';
import { For, Show, createMemo, createResource, createSignal } from 'solid-js';
import { browser } from 'wxt/browser';

import type { DiagnosticRecord, DiagnosticSnapshot } from '@/lib/diagnostics/contracts';
import * as query from '@/lib/diagnostics/query';
import { clearDiagnosticJournal } from '@/lib/diagnostics/journal';
import { formatDiagnosticReport, getDiagnosticSnapshot } from '@/lib/diagnostics/report';
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from '@/ui/drawer';
import { Input } from '@/ui/input';
import { Spinner } from '@/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';

/** Diagnostics sections preserve the investigator's place during one document session. */
type DiagnosticsTabType = 'overview' | 'timeline' | 'jobs' | 'contexts' | 'raw';

/** Diagnostic timeline ordering is explicit because newest-first and trace order serve different jobs. */
type TimelineOrderType = 'newest' | 'oldest';

/** Transient investigator state retained across route changes in the current panel or options page. */
interface DiagnosticsStateType {
	tab: DiagnosticsTabType;
	search: string;
	level: string;
	surface: string;
	order: TimelineOrderType;
	selectedRecordId?: string;
	jobSearch: string;
}

/** Module-local state is intentionally not persisted to extension storage. */
const diagnosticsState: DiagnosticsStateType = {
	tab: 'overview',
	search: '',
	level: 'all',
	surface: 'all',
	order: 'newest',
	jobSearch: '',
};

export type DiagnosticsViewProps = {
	/** Offer the independent full-page diagnostics surface from the side panel. */
	readonly showOpenFullPage?: boolean;
	/** Show standalone recovery copy instead of side-panel routing copy. */
	readonly standalone?: boolean;
};

/** Crash-durable diagnostic investigator shared by the side panel and options page. */
export function DiagnosticsView(props: DiagnosticsViewProps) {
	const [snapshot, { refetch }] = createResource(getDiagnosticSnapshot);
	const [copyState, setCopyState] = createSignal<'idle' | 'copied' | 'failed'>('idle');
	const [clearBusy, setClearBusy] = createSignal(false);
	const [actionError, setActionError] = createSignal('');
	const [tab, setTab] = createSignal<DiagnosticsTabType>(diagnosticsState.tab);
	const failures = () => snapshot()?.records.filter((record) => record.level === 'error' || record.level === 'fatal') ?? [];
	const warnings = () => snapshot()?.records.filter((record) => record.level === 'warning') ?? [];
	const interruptedJobs = () => snapshot()?.jobs.filter((job) => job.reason === 'context-interrupted') ?? [];

	/** Copy the same bounded, redacted support snapshot shown by the interface. */
	async function copyReport(): Promise<void> {
		const value = snapshot();
		if (!value) return;
		setActionError('');
		try {
			await copyText(formatDiagnosticReport(value));
			setCopyState('copied');
			setTimeout(() => setCopyState('idle'), 2_000);
		} catch (error) {
			setCopyState('failed');
			setActionError(error instanceof Error ? error.message : 'Unable to copy the diagnostic report.');
		}
	}

	/** Clear only the diagnostic journal, then reload every derived diagnostic view. */
	async function clearJournal(): Promise<void> {
		setClearBusy(true);
		setActionError('');
		try {
			await clearDiagnosticJournal();
			await refetch();
		} catch (error) {
			setActionError(error instanceof Error ? error.message : 'Unable to clear diagnostics.');
		} finally {
			setClearBusy(false);
		}
	}

	return (
		<>
			<header class="k-page-header">
				<div class="k-page-heading">
					<p class="k-page-eyebrow">Support and recovery</p>
					<h1 class="k-page-title">Diagnostics</h1>
					<p class="k-page-description">
						{props.standalone
							? 'This page stays independent of detector UI state so crash evidence remains available when inspection state is unhealthy.'
							: 'Investigate extension health, interrupted matcher work, runtime contexts, and structured diagnostic records.'}
					</p>
				</div>
			</header>

			<div class="k-toolbar">
				<Button disabled={!snapshot() || snapshot.loading} onClick={() => void copyReport()}>
					<CopyIcon />
					{copyState() === 'copied' ? 'Copied report' : copyState() === 'failed' ? 'Copy failed' : 'Copy report'}
				</Button>
				<Button variant="outline" disabled={snapshot.loading} onClick={() => void refetch()}><RefreshIcon /> Refresh</Button>
				<Show when={props.showOpenFullPage}><Button variant="outline" onClick={() => void browser.runtime.openOptionsPage()}>Open full page</Button></Show>
			</div>

			<Show when={actionError()}>{(message) => <Alert variant="destructive"><AlertTitle>Diagnostics action failed</AlertTitle><AlertDescription>{message()}</AlertDescription></Alert>}</Show>
			<Show when={snapshot.loading && !snapshot()}><div class="panel-section flex items-center gap-3 p-4" role="status"><Spinner class="size-4 text-kaiju-cyan" /><span class="text-sm text-white/58">Reading extension diagnostics…</span></div></Show>
			<Show when={snapshot.error}><Alert variant="destructive"><AlertTitle>Unable to read diagnostics</AlertTitle><AlertDescription>{String(snapshot.error)}</AlertDescription></Alert></Show>

			<Show when={snapshot()}>
				{(value) => (
					<>
						<div class="k-status-grid">
							<DiagnosticMetric label="Contexts" value={value().contexts.length} />
							<DiagnosticMetric label="Failures" value={failures().length} />
							<DiagnosticMetric label="Warnings" value={warnings().length} />
							<DiagnosticMetric label="Interrupted" value={interruptedJobs().length} />
						</div>

						<Show when={interruptedJobs().length > 0}>
							<Alert variant="destructive"><WarningIcon /><AlertTitle>Interrupted matcher work found</AlertTitle><AlertDescription>{interruptedJobs().length} matcher job{interruptedJobs().length === 1 ? '' : 's'} lost its owning background context before completion.</AlertDescription></Alert>
						</Show>

						<Tabs value={tab()} onChange={(value) => { const next = value as DiagnosticsTabType; diagnosticsState.tab = next; setTab(next); }} class="min-w-0">
							<TabsList variant="line" class="no-scrollbar w-full justify-start overflow-x-auto">
								<TabsTrigger value="overview">Overview</TabsTrigger>
								<TabsTrigger value="timeline">Timeline</TabsTrigger>
								<TabsTrigger value="jobs">Jobs</TabsTrigger>
								<TabsTrigger value="contexts">Contexts</TabsTrigger>
								<TabsTrigger value="raw">Raw</TabsTrigger>
							</TabsList>
							<TabsContent value="overview" class="mt-4"><Overview snapshot={value()} clearBusy={clearBusy()} onClear={() => void clearJournal()} /></TabsContent>
							<TabsContent value="timeline" class="mt-4"><Timeline records={value().records} /></TabsContent>
							<TabsContent value="jobs" class="mt-4"><Jobs jobs={value().jobs} /></TabsContent>
							<TabsContent value="contexts" class="mt-4"><Contexts snapshot={value()} /></TabsContent>
							<TabsContent value="raw" class="mt-4"><Raw snapshot={value()} /></TabsContent>
						</Tabs>
					</>
				)}
			</Show>
		</>
	);
}

/** High-signal health summary shown before the detailed investigator views. */
function Overview(props: { readonly snapshot: DiagnosticSnapshot; readonly clearBusy: boolean; readonly onClear: () => void }) {
	return (
		<div class="grid gap-4">
			<Card size="sm">
				<CardHeader><CardTitle>Build and runtime</CardTitle><CardDescription>Identity used to reproduce a friends-and-family report.</CardDescription></CardHeader>
				<CardContent class="grid gap-2 text-xs text-white/58">
					<DiagnosticRow label="Version" value={props.snapshot.extension.version} />
					<DiagnosticRow label="Build" value={props.snapshot.extension.buildId} mono />
					<DiagnosticRow label="Platform" value={formatPlatform(props.snapshot)} />
					<DiagnosticRow label="Storage" value={formatStorageBytes(props.snapshot.storageBytes)} />
					<DiagnosticRow label="Records" value={String(props.snapshot.records.length)} />
					<DiagnosticRow label="Matcher jobs" value={String(props.snapshot.jobs.length)} />
				</CardContent>
			</Card>
			<Card size="sm">
				<CardHeader><CardTitle>Local diagnostic data</CardTitle><CardDescription>Clearing diagnostics does not delete technology results, replay receipts, or automatic-inspection settings.</CardDescription></CardHeader>
				<CardContent><Button variant="outline" disabled={props.clearBusy} onClick={props.onClear}>{props.clearBusy ? 'Clearing diagnostics' : 'Clear diagnostics'}</Button></CardContent>
			</Card>
		</div>
	);
}

/** Searchable, filtered, virtualized diagnostic record list. */
function Timeline(props: { readonly records: readonly DiagnosticRecord[] }) {
	const [search, setSearch] = createSignal(diagnosticsState.search);
	const [level, setLevel] = createSignal(diagnosticsState.level);
	const [surface, setSurface] = createSignal(diagnosticsState.surface);
	const [order, setOrder] = createSignal<TimelineOrderType>(diagnosticsState.order);
	const [selectedId, setSelectedId] = createSignal<string | undefined>(diagnosticsState.selectedRecordId);
	const touch = createMediaQuery('(pointer: coarse), (hover: none)');
	const surfaces = createMemo(() => [...new Set(props.records.map((record) => record.surface))].sort());
	const records = createMemo(() => query.find(props.records, {
		text: search(),
		level: level(),
		surface: surface() as DiagnosticRecord['surface'] | 'all',
		order: order(),
	}));
	const selected = createMemo(() => selectedId() ? props.records.find((record) => record.id === selectedId()) : undefined);
	const filterCount = () => (level() === 'all' ? 0 : 1) + (surface() === 'all' ? 0 : 1) + (order() === 'newest' ? 0 : 1);
	let scrollElement: HTMLDivElement | undefined;
	const virtualizer = createVirtualizer<HTMLDivElement, HTMLDivElement>({
		get count() { return records().length; },
		getScrollElement: () => scrollElement ?? null,
		estimateSize: () => 84,
		getItemKey: (index) => records()[index]?.id ?? index,
		overscan: 8,
	});
	const virtualItems = () => virtualizer.getVirtualItems();

	/** Save a search term without writing diagnostic UI state to durable storage. */
	function searchFor(value: string): void {
		diagnosticsState.search = value;
		setSearch(value);
	}

	/** Change a timeline filter and keep the current diagnostic session stable. */
	function filterBy(next: { readonly level?: string; readonly surface?: string; readonly order?: TimelineOrderType }): void {
		if (next.level !== undefined) {
			diagnosticsState.level = next.level;
			setLevel(next.level);
		}
		if (next.surface !== undefined) {
			diagnosticsState.surface = next.surface;
			setSurface(next.surface);
		}
		if (next.order !== undefined) {
			diagnosticsState.order = next.order;
			setOrder(next.order);
		}
	}

	/** Open one record and retain its identity if the route temporarily unmounts. */
	function select(record: DiagnosticRecord | undefined): void {
		diagnosticsState.selectedRecordId = record?.id;
		setSelectedId(record?.id);
	}

	return (
		<>
			<div class="grid gap-2">
				<div class="flex items-center gap-2">
					<Input class="min-w-0 flex-1" type="search" value={search()} onInput={(event) => searchFor(event.currentTarget.value)} placeholder="Search messages, categories, and fields" aria-label="Search diagnostic records" />
					<DiagnosticFilter level={level()} surface={surface()} order={order()} surfaces={surfaces()} count={filterCount()} onChange={filterBy} />
				</div>
				<p class="font-mono text-[0.625rem] text-white/32">{records().length} matching record{records().length === 1 ? '' : 's'} · {order() === 'newest' ? 'newest first' : 'oldest first'}</p>
			</div>

			<Show when={records().length > 0} fallback={<p class="panel-section mt-3 p-4 text-xs text-white/42">No diagnostic records match the current filters.</p>}>
				<div ref={(element) => { scrollElement = element; }} class="mt-3 h-[min(34rem,65dvh)] overflow-auto rounded-xl border border-white/8 bg-black/10 [overflow-anchor:none] [contain:strict]" tabindex="0" aria-label="Diagnostic timeline">
					<div class="relative w-full" style={{ height: `${virtualizer.getTotalSize()}px` }}>
						<For each={virtualItems()}>
							{(item) => {
								const record = () => records()[item.index];
								return (
									<div ref={virtualizer.measureElement} data-index={item.index} class="absolute left-0 top-0 w-full px-3" style={{ transform: `translateY(${item.start}px)` }}>
										<button type="button" class="k-diagnostic-record w-full text-left focus-kaiju" onClick={() => select(record())}>
											<DiagnosticRecordSummary record={record()} />
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
					<Show when={selected()}>{(record) => <RecordDetail record={record()} />}</Show>
				</DrawerContent>
			</Drawer>
		</>
	);
}

/** Filter severity, runtime surface, and chronology without crowding the primary toolbar. */
function DiagnosticFilter(props: { readonly level: string; readonly surface: string; readonly order: TimelineOrderType; readonly surfaces: readonly DiagnosticRecord['surface'][]; readonly count: number; readonly onChange: (next: { readonly level?: string; readonly surface?: string; readonly order?: TimelineOrderType }) => void }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger as={Button} variant="outline" class="shrink-0 gap-2" aria-label="Filter diagnostics">
				<FilterIcon class="size-4" /><span class="hidden xs:inline">Filter</span><Show when={props.count > 0}><Badge>{props.count}</Badge></Show>
			</DropdownMenuTrigger>
			<DropdownMenuContent class="min-w-60">
				<DropdownMenuLabel>Severity</DropdownMenuLabel>
				<For each={['all', 'warning', 'error', 'fatal', 'info', 'debug', 'trace']}>{(value) => <DropdownMenuItem onSelect={() => props.onChange({ level: value })}><span class="flex-1">{severityLabel(value)}</span><Show when={props.level === value}>✓</Show></DropdownMenuItem>}</For>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Runtime surface</DropdownMenuLabel>
				<DropdownMenuItem onSelect={() => props.onChange({ surface: 'all' })}><span class="flex-1">All surfaces</span><Show when={props.surface === 'all'}>✓</Show></DropdownMenuItem>
				<For each={props.surfaces}>{(value) => <DropdownMenuItem onSelect={() => props.onChange({ surface: value })}><span class="flex-1">{value}</span><Show when={props.surface === value}>✓</Show></DropdownMenuItem>}</For>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Order</DropdownMenuLabel>
				<DropdownMenuItem onSelect={() => props.onChange({ order: 'newest' })}><span class="flex-1">Newest first</span><Show when={props.order === 'newest'}>✓</Show></DropdownMenuItem>
				<DropdownMenuItem onSelect={() => props.onChange({ order: 'oldest' })}><span class="flex-1">Oldest first</span><Show when={props.order === 'oldest'}>✓</Show></DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/** Convert stored LogTape level values into concise menu labels. */
function severityLabel(value: string): string {
	if (value === 'all') return 'All levels';
	return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Matcher job view separated from ordinary LogTape records. */
function Jobs(props: { readonly jobs: DiagnosticSnapshot['jobs'] }) {
	const [query, setQuery] = createSignal(diagnosticsState.jobSearch);
	const jobs = createMemo(() => {
		const search = query().trim().toLocaleLowerCase();
		return !search ? props.jobs : props.jobs.filter((job) => [job.jobId, job.status, job.mode, job.reason ?? '', job.errorMessage ?? ''].some((value) => value.toLocaleLowerCase().includes(search)));
	});
	return (
		<div class="grid gap-3">
			<Input type="search" value={query()} onInput={(event) => { const value = event.currentTarget.value; diagnosticsState.jobSearch = value; setQuery(value); }} placeholder="Search matcher jobs" aria-label="Search matcher jobs" />
			<Show when={jobs().length > 0} fallback={<p class="panel-section p-4 text-xs text-white/42">No matcher jobs match this view.</p>}>
				<For each={jobs()}>{(job) => <div class="panel-section p-3"><div class="flex flex-wrap items-center gap-2"><Badge variant={job.status === 'failed' ? 'destructive' : 'outline'}>{job.status}</Badge><span class="font-mono text-[0.625rem] text-white/32">{job.jobId}</span></div><p class="mt-2 text-xs text-white/48">Partitions {job.completedPartitionCount}/{job.partitionCount}{job.reason ? ` · ${job.reason}` : ''}{job.interruptedStatus ? ` · previous ${job.interruptedStatus}` : ''}</p><Show when={job.errorMessage}><p class="mt-1 text-xs leading-5 text-red-200/78">{job.errorMessage}</p></Show></div>}</For>
			</Show>
		</div>
	);
}

/** Active runtime contexts and persisted context starts shown as one lifecycle view. */
function Contexts(props: { readonly snapshot: DiagnosticSnapshot }) {
	return (
		<div class="grid gap-4">
			<Card size="sm"><CardHeader><CardTitle>Active extension contexts</CardTitle><CardDescription>Runtime contexts visible at the time of this snapshot.</CardDescription></CardHeader><CardContent><Show when={props.snapshot.contexts.length > 0} fallback={<p class="text-xs text-white/42">No contexts returned, or runtime.getContexts is unavailable.</p>}><div class="grid gap-2"><For each={props.snapshot.contexts}>{(context) => <div class="rounded-lg border border-white/8 bg-white/[0.025] p-3"><div class="flex items-center justify-between gap-2"><Badge variant="outline">{context.contextType}</Badge><span class="font-mono text-[0.625rem] text-white/28">{context.contextId}</span></div><p class="mt-2 text-xs text-white/48">{formatContextLocation(context)}</p></div>}</For></div></Show></CardContent></Card>
			<Card size="sm"><CardHeader><CardTitle>Recent context starts</CardTitle><CardDescription>Persisted starts survive context termination and help explain which surface disappeared before a failure.</CardDescription></CardHeader><CardContent><Show when={props.snapshot.runs.length > 0} fallback={<p class="text-xs text-white/42">No context-run records are stored.</p>}><div class="grid gap-2"><For each={props.snapshot.runs}>{(run) => <div class="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.025] p-3"><Badge variant="outline">{run.surface}</Badge><span class="min-w-0 flex-1 truncate font-mono text-[0.625rem] text-white/32">{run.id}</span><time class="font-mono text-[0.625rem] text-white/32">{new Date(run.startedAt).toLocaleTimeString()}</time></div>}</For></div></Show></CardContent></Card>
		</div>
	);
}

/** Raw snapshot stays available for support work without making it the default view. */
function Raw(props: { readonly snapshot: DiagnosticSnapshot }) {
	return <pre class="k-code max-h-[65dvh] whitespace-pre-wrap">{JSON.stringify(props.snapshot, null, 2)}</pre>;
}

/** Full structured record shown in the adaptive detail drawer. */
function RecordDetail(props: { readonly record: DiagnosticRecord }) {
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

/** Compact row content used inside the virtualized timeline. */
function DiagnosticRecordSummary(props: { readonly record: DiagnosticRecord }) {
	return (
		<>
			<div class="flex flex-wrap items-center gap-2"><Badge variant={getRecordBadgeVariant(props.record)}>{props.record.level}</Badge><span class="font-mono text-[0.625rem] text-white/32">{props.record.surface}</span><Show when={(props.record.repeatCount ?? 1) > 1}><Badge variant="outline">×{props.record.repeatCount}</Badge></Show><time class="k-diagnostic-time ml-auto">{new Date(props.record.timestamp).toLocaleTimeString()}</time></div>
			<p class="k-diagnostic-message line-clamp-2">{props.record.message}</p>
		</>
	);
}

/** Summary metric shared by the diagnostics overview header. */
function DiagnosticMetric(props: { readonly label: string; readonly value: number }) {
	return <div class="k-status-card"><p class="k-status-label">{props.label}</p><p class="k-status-value">{props.value}</p></div>;
}

/** Label/value row for build metadata. */
function DiagnosticRow(props: { readonly label: string; readonly value: string; readonly mono?: boolean }) {
	return <div class="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3"><span class="panel-label">{props.label}</span><span class={props.mono ? 'break-all font-mono text-[0.6875rem]' : 'break-words'}>{props.value}</span></div>;
}

/** Map LogTape severity to the existing badge vocabulary. */
function getRecordBadgeVariant(record: DiagnosticRecord): 'default' | 'secondary' | 'destructive' | 'outline' {
	if (record.level === 'error' || record.level === 'fatal') return 'destructive';
	if (record.level === 'warning') return 'default';
	if (record.level === 'info') return 'secondary';
	return 'outline';
}

/** Describe where one extension runtime context was attached. */
function formatContextLocation(context: DiagnosticSnapshot['contexts'][number]): string {
	const parts = [context.windowId === undefined ? undefined : `window ${context.windowId}`, context.tabId === undefined ? undefined : `tab ${context.tabId}`, context.frameId === undefined ? undefined : `frame ${context.frameId}`, context.documentUrl].filter(Boolean);
	return parts.join(' · ') || 'No tab or document location';
}

/** Format the platform triple included in the support snapshot. */
function formatPlatform(snapshot: DiagnosticSnapshot): string {
	return [snapshot.platform?.os, snapshot.platform?.arch, snapshot.platform?.naclArch].filter(Boolean).join(' / ') || 'Unknown';
}

/** Format optional extension storage size. */
function formatStorageBytes(bytes: number | undefined): string {
	return bytes === undefined ? 'Unknown' : formatBytes(bytes);
}

/** Format bytes with the smallest useful binary unit. */
function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
	return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`;
}

/** Copy through the modern Clipboard API with a legacy extension fallback. */
async function copyText(text: string): Promise<void> {
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(text);
		return;
	}

	const textarea = document.createElement('textarea');
	textarea.value = text;
	textarea.style.position = 'fixed';
	textarea.style.opacity = '0';
	document.body.append(textarea);
	textarea.select();
	const copied = document.execCommand('copy');
	textarea.remove();
	if (!copied) throw new Error('Browser clipboard access is unavailable.');
}
