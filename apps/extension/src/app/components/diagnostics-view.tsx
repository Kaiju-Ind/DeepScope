import CopyIcon from '~icons/fluent/copy-24-regular';
import RefreshIcon from '~icons/fluent/arrow-clockwise-24-regular';
import WarningIcon from '~icons/fluent/warning-24-regular';
import { Show, createEffect, createResource, createSignal } from 'solid-js';
import { browser } from 'wxt/browser';

import * as state from '@/app/diagnostics/state';
import { Timeline } from '@/app/diagnostics/timeline';
import { Contexts, Jobs, Metric, Overview, Raw } from '@/app/diagnostics/views';
import { clearDiagnosticJournal } from '@/lib/diagnostics/journal';
import { formatDiagnosticReport, getDiagnosticSnapshot } from '@/lib/diagnostics/report';
import * as clipboard from '@/utils/clipboard';
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert';
import { Button } from '@/ui/button';
import { Spinner } from '@/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';

/** Options accepted by the diagnostics investigator in a side panel or standalone page. */
export interface DiagnosticsViewPropsType {
	/** Offer the independent full-page diagnostics surface from the side panel. */
	readonly showOpenFullPage?: boolean;
	/** Show standalone recovery copy instead of side-panel routing copy. */
	readonly standalone?: boolean;
	/** Active browser tab whose investigator controls should be restored in this panel session. */
	readonly tabId?: number;
}

/** Crash-durable diagnostic investigator shared by the side panel and options page. */
export function DiagnosticsView(props: DiagnosticsViewPropsType) {
	const [snapshot, { refetch }] = createResource(getDiagnosticSnapshot);
	const [copyState, setCopyState] = createSignal<'idle' | 'copied' | 'failed'>('idle');
	const [clearBusy, setClearBusy] = createSignal(false);
	const [actionError, setActionError] = createSignal('');
	const [tab, setTab] = createSignal<state.TabType>(state.get(props.tabId).tab);

	createEffect(() => setTab(state.get(props.tabId).tab));
	const failures = () => snapshot()?.records.filter((record) => record.level === 'error' || record.level === 'fatal') ?? [];
	const warnings = () => snapshot()?.records.filter((record) => record.level === 'warning') ?? [];
	const interruptedJobs = () => snapshot()?.jobs.filter((job) => job.reason === 'context-interrupted') ?? [];

	/** Copy the same bounded, redacted support snapshot shown by the interface. */
	async function copy(): Promise<void> {
		const value = snapshot();
		if (!value) return;
		setActionError('');
		try {
			await clipboard.copy(formatDiagnosticReport(value));
			setCopyState('copied');
			setTimeout(() => setCopyState('idle'), 2_000);
		} catch (error) {
			setCopyState('failed');
			setActionError(error instanceof Error ? error.message : 'Unable to copy the diagnostic report.');
		}
	}

	/** Clear only diagnostic records, then reload every derived diagnostic view. */
	async function clear(): Promise<void> {
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

	/** Persist the selected diagnostics section for this tab's current panel session. */
	function select(value: string): void {
		const next = value as state.TabType;
		state.save(props.tabId, { tab: next });
		setTab(next);
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
				<Button disabled={!snapshot() || snapshot.loading} onClick={() => void copy()}>
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
							<Metric label="Contexts" value={value().contexts.length} />
							<Metric label="Failures" value={failures().length} />
							<Metric label="Warnings" value={warnings().length} />
							<Metric label="Interrupted" value={interruptedJobs().length} />
						</div>

						<Show when={interruptedJobs().length > 0}>
							<Alert variant="destructive"><WarningIcon /><AlertTitle>Interrupted matcher work found</AlertTitle><AlertDescription>{interruptedJobs().length} matcher job{interruptedJobs().length === 1 ? '' : 's'} lost its owning background context before completion.</AlertDescription></Alert>
						</Show>

						<Tabs value={tab()} onChange={select} class="min-w-0">
							<TabsList variant="line" class="no-scrollbar w-full justify-start overflow-x-auto">
								<TabsTrigger value="overview">Overview</TabsTrigger>
								<TabsTrigger value="timeline">Timeline</TabsTrigger>
								<TabsTrigger value="jobs">Jobs</TabsTrigger>
								<TabsTrigger value="contexts">Contexts</TabsTrigger>
								<TabsTrigger value="raw">Raw</TabsTrigger>
							</TabsList>
							<TabsContent value="overview" class="mt-4"><Overview snapshot={value()} clearBusy={clearBusy()} onClear={() => void clear()} /></TabsContent>
							<TabsContent value="timeline" class="mt-4"><Timeline records={value().records} tabId={props.tabId} /></TabsContent>
							<TabsContent value="jobs" class="mt-4"><Jobs jobs={value().jobs} tabId={props.tabId} /></TabsContent>
							<TabsContent value="contexts" class="mt-4"><Contexts snapshot={value()} /></TabsContent>
							<TabsContent value="raw" class="mt-4"><Raw snapshot={value()} /></TabsContent>
						</Tabs>
					</>
				)}
			</Show>
		</>
	);
}
