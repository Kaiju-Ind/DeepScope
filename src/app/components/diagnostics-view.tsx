import CopyIcon from '~icons/fluent/copy-24-regular';
import RefreshIcon from '~icons/fluent/arrow-clockwise-24-regular';
import WarningIcon from '~icons/fluent/warning-24-regular';
import { For, Show, createResource, createSignal } from 'solid-js';
import { browser } from 'wxt/browser';

import type { DiagnosticRecord, DiagnosticSnapshot } from '@/lib/diagnostics/contracts';
import { clearDiagnosticJournal } from '@/lib/diagnostics/journal';
import { formatDiagnosticReport, getDiagnosticSnapshot } from '@/lib/diagnostics/report';
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { Spinner } from '@/ui/spinner';

export type DiagnosticsViewProps = {
	/** Offer the independent full-page diagnostics surface from the side panel. */
	readonly showOpenFullPage?: boolean;
	/** Show the standalone page heading instead of side-panel routing copy. */
	readonly standalone?: boolean;
};

/** Crash-durable diagnostic journal and support-report UI shared by panel and options page. */
export function DiagnosticsView(props: DiagnosticsViewProps) {
	const [snapshot, { refetch }] = createResource(getDiagnosticSnapshot);
	const [copyState, setCopyState] = createSignal<'idle' | 'copied' | 'failed'>('idle');
	const [clearBusy, setClearBusy] = createSignal(false);
	const [actionError, setActionError] = createSignal('');
	const failures = () => snapshot()?.records.filter((record) => record.level === 'error' || record.level === 'fatal') ?? [];
	const warnings = () => snapshot()?.records.filter((record) => record.level === 'warning') ?? [];
	const interruptedJobs = () => snapshot()?.jobs.filter((job) => job.reason === 'context-interrupted') ?? [];

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
							? 'This page is independent of the detector UI so a support report remains available when scan state is unhealthy.'
							: 'Inspect extension health, interrupted matcher work, and the bounded local crash journal.'}
					</p>
				</div>
			</header>

			<div class="k-toolbar">
				<Button disabled={!snapshot() || snapshot.loading} onClick={() => void copyReport()}>
					<CopyIcon />
					{copyState() === 'copied' ? 'Copied report' : copyState() === 'failed' ? 'Copy failed' : 'Copy report'}
				</Button>
				<Button variant="outline" disabled={snapshot.loading} onClick={() => void refetch()}>
					<RefreshIcon /> Refresh
				</Button>
				<Show when={props.showOpenFullPage}>
					<Button variant="outline" onClick={() => void browser.runtime.openOptionsPage()}>Open full page</Button>
				</Show>
			</div>

			<Show when={actionError()}>
				{(message) => (
					<Alert variant="destructive">
						<AlertTitle>Diagnostics action failed</AlertTitle>
						<AlertDescription>{message()}</AlertDescription>
					</Alert>
				)}
			</Show>

			<Show when={snapshot.loading && !snapshot()}>
				<div class="panel-section flex items-center gap-3 p-4" role="status">
					<Spinner class="size-4 text-kaiju-cyan" />
					<span class="text-sm text-white/58">Reading extension diagnostics…</span>
				</div>
			</Show>

			<Show when={snapshot.error}>
				<Alert variant="destructive">
					<AlertTitle>Unable to read diagnostics</AlertTitle>
					<AlertDescription>{String(snapshot.error)}</AlertDescription>
				</Alert>
			</Show>

			<Show when={snapshot()}>
				{(value) => (
					<>
						<div class="k-status-grid">
							<DiagnosticMetric label="Contexts" value={value().contexts.length} />
							<DiagnosticMetric label="Failures" value={failures().length} />
							<DiagnosticMetric label="Warnings" value={warnings().length} />
							<DiagnosticMetric label="Interrupted" value={interruptedJobs().length} />
						</div>

						<Card size="sm">
							<CardHeader>
								<CardTitle>Build and runtime</CardTitle>
								<CardDescription>Identity used to reproduce a friends-and-family report.</CardDescription>
							</CardHeader>
							<CardContent class="grid gap-2 text-xs text-white/58">
								<DiagnosticRow label="Version" value={value().extension.version} />
								<DiagnosticRow label="Build" value={value().extension.buildId} mono />
								<DiagnosticRow label="Platform" value={formatPlatform(value())} />
								<DiagnosticRow label="Storage" value={formatStorageBytes(value().storageBytes)} />
							</CardContent>
						</Card>

						<Show when={interruptedJobs().length > 0}>
							<Alert variant="destructive">
								<WarningIcon />
								<AlertTitle>Interrupted matcher work found</AlertTitle>
								<AlertDescription>
									{interruptedJobs().length} matcher job{interruptedJobs().length === 1 ? '' : 's'} lost its owning background context before completion.
								</AlertDescription>
							</Alert>
						</Show>

						<Card size="sm">
							<CardHeader>
								<CardTitle>Active extension contexts</CardTitle>
								<CardDescription>Chrome 119+ runtime contexts visible at the time of this snapshot.</CardDescription>
							</CardHeader>
							<CardContent>
								<Show when={value().contexts.length > 0} fallback={<p class="text-xs text-white/42">No contexts returned, or runtime.getContexts is unavailable.</p>}>
									<div class="grid gap-2">
										<For each={value().contexts}>
											{(context) => (
												<div class="rounded-lg border border-white/8 bg-white/[0.025] p-3">
													<div class="flex items-center justify-between gap-2">
														<Badge variant="outline">{context.contextType}</Badge>
														<span class="font-mono text-[0.625rem] text-white/28">{context.contextId}</span>
													</div>
													<p class="mt-2 text-xs text-white/48">{formatContextLocation(context)}</p>
												</div>
											)}
										</For>
									</div>
								</Show>
							</CardContent>
						</Card>


						<Card size="sm">
							<CardHeader>
								<CardTitle>Recent context runs</CardTitle>
								<CardDescription>Persisted starts survive context termination and help explain which execution surface disappeared before a failure.</CardDescription>
							</CardHeader>
							<CardContent>
								<Show when={value().runs.length > 0} fallback={<p class="text-xs text-white/42">No context-run records are stored.</p>}>
									<div class="grid gap-2">
										<For each={value().runs.slice(0, 16)}>
											{(run) => (
												<div class="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.025] p-3">
													<Badge variant="outline">{run.surface}</Badge>
													<span class="min-w-0 flex-1 truncate font-mono text-[0.625rem] text-white/32">{run.id}</span>
													<time class="font-mono text-[0.625rem] text-white/32">{new Date(run.startedAt).toLocaleTimeString()}</time>
												</div>
											)}
										</For>
									</div>
								</Show>
							</CardContent>
						</Card>

						<Card size="sm">
							<CardHeader>
								<CardTitle>Recent matcher jobs</CardTitle>
								<CardDescription>Durable lifecycle records help distinguish a detector failure from an ordinary empty result.</CardDescription>
							</CardHeader>
							<CardContent>
								<Show when={value().jobs.length > 0} fallback={<p class="text-xs text-white/42">No matcher jobs are stored.</p>}>
									<div class="grid gap-2">
										<For each={value().jobs.slice(0, 10)}>
											{(job) => (
												<div class="rounded-lg border border-white/8 bg-white/[0.025] p-3">
													<div class="flex flex-wrap items-center gap-2">
														<Badge variant={job.status === 'failed' ? 'destructive' : 'outline'}>{job.status}</Badge>
														<span class="font-mono text-[0.625rem] text-white/32">{job.jobId}</span>
													</div>
													<p class="mt-2 text-xs text-white/48">
														Partitions {job.completedPartitionCount}/{job.partitionCount}
														{job.reason ? ` · ${job.reason}` : ''}
														{job.interruptedStatus ? ` · previous ${job.interruptedStatus}` : ''}
													</p>
													<Show when={job.errorMessage}><p class="mt-1 text-xs leading-5 text-red-200/78">{job.errorMessage}</p></Show>
												</div>
											)}
										</For>
									</div>
								</Show>
							</CardContent>
						</Card>

						<Card size="sm">
							<CardHeader>
								<CardTitle>Recent diagnostic records</CardTitle>
								<CardDescription>The newest locally retained LogTape and crash records. Values are bounded and sensitive-looking scalars are redacted before storage.</CardDescription>
							</CardHeader>
							<CardContent>
								<Show when={value().records.length > 0} fallback={<p class="text-xs text-white/42">No diagnostic records are stored yet.</p>}>
									<div>
										<For each={value().records.slice(0, 80)}>{(record) => <DiagnosticRecordRow record={record} />}</For>
									</div>
								</Show>
							</CardContent>
						</Card>

						<Card size="sm">
							<CardHeader>
								<CardTitle>Local diagnostic data</CardTitle>
								<CardDescription>Clear the support journal without deleting technology detections, replay receipts, or automatic-scan settings.</CardDescription>
							</CardHeader>
							<CardContent>
								<Button variant="outline" disabled={clearBusy()} onClick={() => void clearJournal()}>
									{clearBusy() ? 'Clearing diagnostics' : 'Clear diagnostics'}
								</Button>
							</CardContent>
						</Card>
					</>
				)}
			</Show>
		</>
	);
}

function DiagnosticMetric(props: { readonly label: string; readonly value: number }) {
	return <div class="k-status-card"><p class="k-status-label">{props.label}</p><p class="k-status-value">{props.value}</p></div>;
}

function DiagnosticRow(props: { readonly label: string; readonly value: string; readonly mono?: boolean }) {
	return (
		<div class="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3">
			<span class="panel-label">{props.label}</span>
			<span class={props.mono ? 'break-all font-mono text-[0.6875rem]' : 'break-words'}>{props.value}</span>
		</div>
	);
}

function DiagnosticRecordRow(props: { readonly record: DiagnosticRecord }) {
	return (
		<div class="k-diagnostic-record">
			<div class="flex flex-wrap items-center gap-2">
				<Badge variant={getRecordBadgeVariant(props.record)}>{props.record.level}</Badge>
				<span class="font-mono text-[0.625rem] text-white/32">{props.record.surface}</span>
				<time class="k-diagnostic-time ml-auto">{new Date(props.record.timestamp).toLocaleTimeString()}</time>
			</div>
			<p class="k-diagnostic-message">{props.record.message}</p>
			<Show when={Object.keys(props.record.properties).length > 0}>
				<details class="mt-2">
					<summary class="cursor-pointer text-[0.6875rem] text-white/38">Structured fields</summary>
					<pre class="k-code mt-2 whitespace-pre-wrap">{JSON.stringify(props.record.properties, null, 2)}</pre>
				</details>
			</Show>
		</div>
	);
}

function getRecordBadgeVariant(record: DiagnosticRecord): 'default' | 'secondary' | 'destructive' | 'outline' {
	if (record.level === 'error' || record.level === 'fatal') return 'destructive';
	if (record.level === 'warning') return 'default';
	if (record.level === 'info') return 'secondary';
	return 'outline';
}

function formatContextLocation(context: DiagnosticSnapshot['contexts'][number]): string {
	const parts = [
		context.windowId === undefined ? undefined : `window ${context.windowId}`,
		context.tabId === undefined ? undefined : `tab ${context.tabId}`,
		context.frameId === undefined ? undefined : `frame ${context.frameId}`,
		context.documentUrl,
	].filter(Boolean);
	return parts.join(' · ') || 'No tab or document location';
}

function formatPlatform(snapshot: DiagnosticSnapshot): string {
	return [snapshot.platform?.os, snapshot.platform?.arch, snapshot.platform?.naclArch].filter(Boolean).join(' / ') || 'Unknown';
}

function formatStorageBytes(bytes: number | undefined): string {
	return bytes === undefined ? 'Unknown' : formatBytes(bytes);
}

function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
	return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`;
}

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
