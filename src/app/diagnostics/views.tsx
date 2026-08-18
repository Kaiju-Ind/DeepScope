import { For, Show, createEffect, createMemo, createSignal } from 'solid-js';

import * as state from '@/app/diagnostics/state';
import type { DiagnosticSnapshot } from '@/lib/diagnostics/contracts';
import * as bytes from '@/utils/bytes';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Input } from '@/ui/input';

/** Props for the high-signal diagnostic health summary. */
export interface OverviewPropsType {
	readonly snapshot: DiagnosticSnapshot;
	readonly clearBusy: boolean;
	readonly onClear: () => void;
}

/** High-signal health summary shown before detailed investigator views. */
export function Overview(props: OverviewPropsType) {
	return (
		<div class="grid gap-4">
			<Card size="sm">
				<CardHeader><CardTitle>Build and runtime</CardTitle><CardDescription>Identity used to reproduce a friends-and-family report.</CardDescription></CardHeader>
				<CardContent class="grid gap-2 text-xs text-white/58">
					<Row label="Version" value={props.snapshot.extension.version} />
					<Row label="Build" value={props.snapshot.extension.buildId} mono />
					<Row label="Platform" value={platform(props.snapshot)} />
					<Row label="Storage" value={props.snapshot.storageBytes === undefined ? 'Unknown' : bytes.format(props.snapshot.storageBytes)} />
					<Row label="Records" value={String(props.snapshot.records.length)} />
					<Row label="Matcher jobs" value={String(props.snapshot.jobs.length)} />
				</CardContent>
			</Card>
			<Card size="sm">
				<CardHeader><CardTitle>Local diagnostic data</CardTitle><CardDescription>Clearing diagnostics does not delete technology results, replay receipts, or automatic-inspection settings.</CardDescription></CardHeader>
				<CardContent><Button variant="outline" disabled={props.clearBusy} onClick={props.onClear}>{props.clearBusy ? 'Clearing diagnostics' : 'Clear diagnostics'}</Button></CardContent>
			</Card>
		</div>
	);
}

/** Inputs for the matcher-job investigator view. */
export interface JobsPropsType {
	readonly jobs: DiagnosticSnapshot['jobs'];
	readonly tabId?: number;
}

/** Matcher job view separated from ordinary LogTape records. */
export function Jobs(props: JobsPropsType) {
	const [query, setQuery] = createSignal(state.get(props.tabId).jobSearch);
	createEffect(() => setQuery(state.get(props.tabId).jobSearch));
	const jobs = createMemo(() => {
		const search = query().trim().toLocaleLowerCase();
		return !search ? props.jobs : props.jobs.filter((job) => [job.jobId, job.status, job.mode, job.reason ?? '', job.errorMessage ?? ''].some((value) => value.toLocaleLowerCase().includes(search)));
	});
	return (
		<div class="grid gap-3">
			<Input type="search" value={query()} onInput={(event) => { const value = event.currentTarget.value; state.save(props.tabId, { jobSearch: value }); setQuery(value); }} placeholder="Search matcher jobs" aria-label="Search matcher jobs" />
			<Show when={jobs().length > 0} fallback={<p class="panel-section p-4 text-xs text-white/42">No matcher jobs match this view.</p>}>
				<For each={jobs()}>{(job) => <div class="panel-section p-3"><div class="flex flex-wrap items-center gap-2"><Badge variant={job.status === 'failed' ? 'destructive' : 'outline'}>{job.status}</Badge><span class="font-mono text-[0.625rem] text-white/32">{job.jobId}</span></div><p class="mt-2 text-xs text-white/48">Partitions {job.completedPartitionCount}/{job.partitionCount}{job.reason ? ` · ${job.reason}` : ''}{job.interruptedStatus ? ` · previous ${job.interruptedStatus}` : ''}</p><Show when={job.errorMessage}><p class="mt-1 text-xs leading-5 text-red-200/78">{job.errorMessage}</p></Show></div>}</For>
			</Show>
		</div>
	);
}

/** Active runtime contexts and persisted context starts shown as one lifecycle view. */
export function Contexts(props: { readonly snapshot: DiagnosticSnapshot }) {
	return (
		<div class="grid gap-4">
			<Card size="sm"><CardHeader><CardTitle>Active extension contexts</CardTitle><CardDescription>Runtime contexts visible at the time of this snapshot.</CardDescription></CardHeader><CardContent><Show when={props.snapshot.contexts.length > 0} fallback={<p class="text-xs text-white/42">No contexts returned, or runtime.getContexts is unavailable.</p>}><div class="grid gap-2"><For each={props.snapshot.contexts}>{(context) => <div class="rounded-lg border border-white/8 bg-white/[0.025] p-3"><div class="flex items-center justify-between gap-2"><Badge variant="outline">{context.contextType}</Badge><span class="font-mono text-[0.625rem] text-white/28">{context.contextId}</span></div><p class="mt-2 text-xs text-white/48">{location(context)}</p></div>}</For></div></Show></CardContent></Card>
			<Card size="sm"><CardHeader><CardTitle>Recent context starts</CardTitle><CardDescription>Persisted starts survive context termination and help explain which surface disappeared before a failure.</CardDescription></CardHeader><CardContent><Show when={props.snapshot.runs.length > 0} fallback={<p class="text-xs text-white/42">No context-run records are stored.</p>}><div class="grid gap-2"><For each={props.snapshot.runs}>{(run) => <div class="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.025] p-3"><Badge variant="outline">{run.surface}</Badge><span class="min-w-0 flex-1 truncate font-mono text-[0.625rem] text-white/32">{run.id}</span><time class="font-mono text-[0.625rem] text-white/32">{new Date(run.startedAt).toLocaleTimeString()}</time></div>}</For></div></Show></CardContent></Card>
		</div>
	);
}

/** Raw support snapshot remains available without becoming the default diagnostic view. */
export function Raw(props: { readonly snapshot: DiagnosticSnapshot }) {
	return <pre class="k-code max-h-[65dvh] whitespace-pre-wrap">{JSON.stringify(props.snapshot, null, 2)}</pre>;
}

/** Summary metric reused by the diagnostic health header. */
export function Metric(props: { readonly label: string; readonly value: number }) {
	return <div class="k-status-card"><p class="k-status-label">{props.label}</p><p class="k-status-value">{props.value}</p></div>;
}

/** Small label/value row for immutable build metadata. */
function Row(props: { readonly label: string; readonly value: string; readonly mono?: boolean }) {
	return <div class="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3"><span class="panel-label">{props.label}</span><span class={props.mono ? 'break-all font-mono text-[0.6875rem]' : 'break-words'}>{props.value}</span></div>;
}

/** Describe where one runtime context was attached. */
function location(context: DiagnosticSnapshot['contexts'][number]): string {
	const parts = [context.windowId === undefined ? undefined : `window ${context.windowId}`, context.tabId === undefined ? undefined : `tab ${context.tabId}`, context.frameId === undefined ? undefined : `frame ${context.frameId}`, context.documentUrl].filter(Boolean);
	return parts.join(' · ') || 'No tab or document location';
}

/** Format the platform triple captured in one diagnostic snapshot. */
function platform(snapshot: DiagnosticSnapshot): string {
	return [snapshot.platform?.os, snapshot.platform?.arch, snapshot.platform?.naclArch].filter(Boolean).join(' / ') || 'Unknown';
}
