import RefreshIcon from '~icons/fluent/arrow-clockwise-24-regular';
import DismissIcon from '~icons/fluent/dismiss-24-regular';
import { For, Show } from 'solid-js';

import type { DetectionReplaySummary } from '@/lib/storage/session';
import type { DetectionReplayTrace } from '@/lib/pipeline';
import { AnalysisProgress } from '@/app/components/analysis-progress';
import { useScans } from '@/app/context';
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';

/** Current scan controls, runtime state, and replay receipts. */
export function ScansPage() {
	const panel = useScans();

	return (
		<>
			<header class="k-page-header">
				<div class="k-page-heading">
					<p class="k-page-eyebrow">Local detector</p>
					<h1 class="k-page-title">Scans</h1>
					<p class="k-page-description">Start a scan, inspect the active run, or review the most recent replay receipts.</p>
				</div>
			</header>

			<div class="k-toolbar">
				<Button disabled={panel.busy()} onClick={() => void panel.refresh()}>
					<RefreshIcon />
					{panel.busy() ? 'Refreshing' : 'Refresh'}
				</Button>
				<Button
					variant="outline"
					disabled={panel.busy() || panel.liveUpdateMode() !== 'active'}
					onClick={() => void panel.stopObservation()}
				>
					<DismissIcon />
					Stop observation
				</Button>
			</div>

			<div class="k-status-grid">
				<StatusCard label="Detector" value={panel.analysisActivity().label} />
				<StatusCard label="Observation" value={panel.liveUpdateChipLabel()} />
				<StatusCard label="Evidence" value={panel.evidenceCompletenessLabel()} />
				<StatusCard label="Results" value={String(panel.resultCount())} />
			</div>

			<Card size="sm">
				<CardHeader>
					<CardTitle>Current page</CardTitle>
					<CardDescription>{panel.analysis()?.hostname ?? panel.visibleTabIdentity()?.hostname ?? 'No inspectable page selected.'}</CardDescription>
				</CardHeader>
				<CardContent class="flex flex-wrap gap-2">
					<Badge variant="outline">Source: {panel.analysis()?.source ?? 'none'}</Badge>
					<Badge variant="outline">Matcher: {panel.matcherStatus()}</Badge>
				</CardContent>
			</Card>

			<Show when={panel.analysisActivity().busy}>
				<AnalysisProgress activity={panel.analysisActivity()} />
			</Show>

			<Show when={panel.errorMessage()}>
				{(message) => (
					<Alert variant="destructive">
						<AlertTitle>Scan failed</AlertTitle>
						<AlertDescription>{message()}</AlertDescription>
					</Alert>
				)}
			</Show>
			<Show when={panel.notice()}>
				{(notice) => (
					<Alert>
						<AlertTitle>{notice().variant === 'success' ? 'Scan updated' : 'Scan status'}</AlertTitle>
						<AlertDescription>{notice().text}</AlertDescription>
					</Alert>
				)}
			</Show>

			<Show when={Boolean(panel.latestReplaySummary()) || panel.replayHistory().length > 0}>
				<Card size="sm">
					<CardHeader>
						<CardTitle>Replay history</CardTitle>
						<CardDescription>Saved detector receipts for the current visible analysis.</CardDescription>
					</CardHeader>
					<CardContent>
						<Show when={panel.latestReplaySummary()}>
							{(summary) => (
								<p class="mb-3 text-xs text-white/48">Latest: {formatReplaySummarySnapshot(summary())}</p>
							)}
						</Show>
						<Show when={panel.replayHistory().length > 0}>
							<ol class="grid gap-2">
								<For each={panel.replayHistory().slice(0, 8)}>
									{(trace) => (
										<li class="rounded-lg border border-white/8 bg-white/[0.025] p-3">
											<div class="flex items-center justify-between gap-3">
												<span class="text-xs font-medium text-white/72">{formatReplaySummary(trace)}</span>
												<time class="font-mono text-[0.625rem] text-white/32">{formatReplayTime(trace)}</time>
											</div>
											<p class="mt-1 text-xs text-white/42">{trace.events.length} replay event{trace.events.length === 1 ? '' : 's'}</p>
										</li>
									)}
								</For>
							</ol>
						</Show>
					</CardContent>
				</Card>
			</Show>
		</>
	);
}

function StatusCard(props: { readonly label: string; readonly value: string }) {
	return (
		<div class="k-status-card">
			<p class="k-status-label">{props.label}</p>
			<p class="k-status-value break-words text-sm">{props.value}</p>
		</div>
	);
}

function formatReplayTime(trace: DetectionReplayTrace): string {
	return new Date(trace.analyzedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatReplaySummary(trace: DetectionReplayTrace): string {
	return `${trace.resultCount} detection${trace.resultCount === 1 ? '' : 's'}`;
}

function formatReplaySummarySnapshot(summary: DetectionReplaySummary): string {
	return `${summary.resultCount} detection${summary.resultCount === 1 ? '' : 's'} · ${summary.eventCount} replay event${summary.eventCount === 1 ? '' : 's'}`;
}
