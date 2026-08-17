import { For, Show } from 'solid-js';

import { CategoryGroup } from '@/components/CategoryGroup';
import { EmptyState } from '@/components/EmptyState';
import type { DetectionReplaySummary } from '@/lib/contracts/detection-session';
import type { DetectionReplayTrace } from '@/lib/pipeline';
import { useTechnologies } from '@/panel/context';
import { PanelShell } from '@/panel/shell';

/** Format replay timestamps for the compact history list. */
function formatReplayTime(trace: DetectionReplayTrace) {
	return new Date(trace.analyzedAt).toLocaleString();
}

/** Summarize a full replay trace without exposing raw page observations. */
function formatReplaySummary(trace: DetectionReplayTrace) {
	return `${trace.resultCount} detection${trace.resultCount === 1 ? '' : 's'}`;
}

/** Summarize the latest stored replay receipt when full history is not hydrated yet. */
function formatReplaySummarySnapshot(summary: DetectionReplaySummary) {
	return `${summary.resultCount} detection${summary.resultCount === 1 ? '' : 's'} · ${summary.eventCount} replay event${summary.eventCount === 1 ? '' : 's'}`;
}

function LoadingState(props: { readonly headline: string; readonly message: string }) {
	return (
		<div class="loading-state" role="status" aria-live="polite">
			<span class="loading-spinner" aria-hidden="true" />
			<div>
				<strong>{props.headline}</strong>
				<p>{props.message}</p>
			</div>
		</div>
	);
}

/** Latest normalized technology detections and their stored replay history. */
export function TechnologiesPage() {
	const panel = useTechnologies();

	return (
		<PanelShell.ResultPanel
			modeChip={(
				<Show when={panel.analysis()}>
					{(value) => <span class="mode-chip">{value().source}</span>}
				</Show>
			)}
			meta={
				panel.analysisActivity().busy
					? panel.analysisActivity().description
					: panel.hasLateDetections()
						? `${panel.lateAddedIds().length} detection${panel.lateAddedIds().length === 1 ? '' : 's'} changed during recent analysis updates and are marked below.`
						: panel.liveUpdateMode() === 'active'
							? 'Initial scan is complete. Observed page updates will appear separately as new evidence arrives.'
							: panel.liveUpdateMode() === 'stopped'
								? 'Observation is stopped. The latest detector snapshot remains visible until refresh starts a new session.'
								: 'Showing the latest detector snapshot for this page.'
			}
		>
			<Show
				when={panel.analysis()}
				fallback={<EmptyState message="Opening the popup loads the latest detections automatically." />}
			>
				{(value) => (
					<Show
						when={value().results.length}
						fallback={(
							<Show
								when={panel.analysisActivity().busy}
								fallback={<EmptyState message="No technologies detected yet." />}
							>
								<LoadingState
									headline={panel.analysisActivity().headline}
									message={panel.analysisActivity().description}
								/>
							</Show>
						)}
					>
						<For each={panel.groupedResults()}>
							{(group) => (
								<CategoryGroup
									label={group.label}
									results={group.results}
									newDetectionIds={panel.lateAddedIds()}
									explanationsByTechnologyId={panel.explanationsByTechnologyId()}
								/>
							)}
						</For>
						<Show when={!panel.analysisActivity().busy && (Boolean(panel.latestReplaySummary()) || panel.replayHistory().length > 0)}>
							<PanelShell.ReplayHistory>
								<div class="replay-history-heading">
									<h3>Replay History</h3>
									<p class="result-meta">
										{panel.matcherStatus() === 'recording' || panel.matcherStatus() === 'matching'
											? 'Current run is still recording. Stored summaries appear here as soon as snapshot persistence completes.'
											: panel.liveUpdateMode() === 'active'
												? 'A saved replay receipt is available, but page observation is still open and new detections can still arrive.'
												: 'Replay receipts that match the visible detector run. Open one to inspect the saved explanation count.'}
									</p>
									<Show when={panel.latestReplaySummary()}>
										{(summary) => (
											<p class="result-meta">Latest stored summary: {formatReplaySummarySnapshot(summary())}</p>
										)}
									</Show>
								</div>
								<Show when={panel.replayHistory().length > 0}>
									<ol class="replay-history-list">
										<For each={panel.replayHistory().slice(0, 5)}>
											{(trace) => (
												<li>
													<details>
														<summary>
															<span>{formatReplayTime(trace)}</span>
															<span>{formatReplaySummary(trace)}</span>
														</summary>
														<ul class="evidence-list replay-event-list">
															<For each={trace.events}>
																{(event) => <li>{event.sequence + 1}. {event.stage}: {event.count}</li>}
															</For>
														</ul>
													</details>
												</li>
											)}
										</For>
									</ol>
								</Show>
							</PanelShell.ReplayHistory>
						</Show>
					</Show>
				)}
			</Show>
		</PanelShell.ResultPanel>
	);
}
