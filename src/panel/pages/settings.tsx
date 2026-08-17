import { useSettings } from '@/panel/context';

/** Automatic scan and locally stored detector-data controls. */
export function SettingsPage() {
	const panel = useSettings();

	return (
		<>
			<section class="auto-scan-setting" aria-label="Automatic scanning">
				<label class="auto-scan-toggle">
					<input
						type="checkbox"
						checked={panel.autoScanEnabled()}
						disabled={panel.autoScanSettingInFlight()}
						onChange={(event) => void panel.setAutoScanEnabled(event.currentTarget.checked)}
					/>
					<span>
						<strong>Scan pages automatically</strong>
						<small>
							Start a bounded local analysis when an active HTTP or HTTPS page finishes loading. Turn this off to scan only when you open this panel or press Refresh.
						</small>
					</span>
				</label>
			</section>

			<section class="privacy-disclosure" aria-label="Privacy and local storage">
				<div>
					<strong>Local page analysis</strong>
					<p>
						When automatic scanning is enabled, Kaiju Site Scope can inspect normal HTTP/HTTPS pages as they become active. Detection runs locally; results, replay summaries, and cache records stay in extension storage unless you clear them or uninstall the extension.
					</p>
				</div>
				<button
					class="secondary-button compact-button"
					disabled={panel.clearStoredDataInFlight()}
					onClick={() => void panel.clearStoredData()}
				>
					{panel.clearStoredDataInFlight() ? 'Clearing...' : 'Clear stored detector data'}
				</button>
			</section>
		</>
	);
}
