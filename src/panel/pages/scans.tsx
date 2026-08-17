import { Show } from 'solid-js';

import { ErrorState } from '@/components/ErrorState';
import { useScans } from '@/panel/context';
import { PanelShell } from '@/panel/shell';

/** Current scan controls, summary metrics, and live analysis feedback. */
export function ScansPage() {
	const panel = useScans();

	return (
		<>
			<PanelShell.Hero>
				<PanelShell.HeroCopy>
					<p class="eyebrow">Technology Detection</p>
					<h1>Kaiju Site Scope</h1>
					<p class="lede">
						Analyze the visible tab locally, then keep the latest normalized detections up to date as the page lazy-loads.
					</p>
				</PanelShell.HeroCopy>

				<PanelShell.Actions>
					<button class="primary-button" disabled={panel.busy()} onClick={() => void panel.refresh()}>
						{panel.busy() ? 'Refreshing...' : 'Refresh'}
					</button>
					<button
						class="secondary-button"
						disabled={panel.busy() || panel.liveUpdateMode() !== 'active'}
						onClick={() => void panel.stopObservation()}
					>
						Stop observation
					</button>
				</PanelShell.Actions>

				<PanelShell.Stats>
					<PanelShell.Stat accent="moss" label="Cached Analyses" value={panel.status.totalAnalyses} />
					<PanelShell.Stat accent="amber" label="Tracked Origins" value={panel.status.trackedOrigins} />
					<PanelShell.Stat accent="slate" label="Detected Technologies" value={panel.resultCount()} />
				</PanelShell.Stats>

				<PanelShell.Metrics>
					<p>Source: {panel.analysis()?.source ?? 'none'}</p>
					<p>Host: {panel.analysis()?.hostname ?? panel.visibleTabIdentity()?.hostname ?? 'not analyzed'}</p>
					<p>Detector: {panel.analysisActivity().label}</p>
					<p>Evidence: {panel.evidenceCompletenessLabel()}</p>
					<p>Observation: {panel.liveUpdateChipLabel().toLowerCase()}</p>
				</PanelShell.Metrics>
			</PanelShell.Hero>

			<PanelShell.Feedback>
				<Show when={panel.errorMessage()}>{(value) => <ErrorState message={value()} />}</Show>
				<Show when={panel.notice()}>
					{(value) => (
						<p class={`status-message ${value().variant}`} role="status" aria-live="polite">
							{value().text}
						</p>
					)}
				</Show>
				<Show when={panel.analysisActivity().busy}>
					<div class="scan-activity" role="status" aria-live="polite">
						<div class="scan-activity-orb" aria-hidden="true" />
						<div class="scan-activity-copy">
							<strong>{panel.analysisActivity().headline}</strong>
							<p>{panel.analysisActivity().description}</p>
						</div>
					</div>
				</Show>
			</PanelShell.Feedback>
		</>
	);
}
