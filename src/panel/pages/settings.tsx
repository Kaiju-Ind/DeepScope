import { useSettings } from '@/panel/context';
import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card';
import { ButtonLink } from '@/ui/router-link';
import { Switch } from '@/ui/switch';

/** Automatic scan, local storage, and privacy controls. */
export function SettingsPage() {
	const panel = useSettings();

	return (
		<>
			<header class="k-page-header">
				<div class="k-page-heading">
					<p class="k-page-eyebrow">Extension preferences</p>
					<h1 class="k-page-title">Settings</h1>
					<p class="k-page-description">Choose when Kaiju scans pages and manage data stored by the extension.</p>
				</div>
			</header>

			<section class="k-setting-row" aria-labelledby="automatic-scan-title">
				<div class="k-setting-copy">
					<h2 id="automatic-scan-title" class="k-setting-title">Scan pages automatically</h2>
					<p class="k-setting-description">
						Start a bounded local analysis when the active HTTP or HTTPS page finishes loading. Turn this off to scan only when you open the panel or press Refresh.
					</p>
				</div>
				<Switch
					checked={panel.autoScanEnabled()}
					disabled={panel.autoScanSettingInFlight()}
					onChange={(enabled) => void panel.setAutoScanEnabled(enabled)}
					aria-label="Scan pages automatically"
				/>
			</section>

			<Card size="sm">
				<CardHeader>
					<CardTitle>Local detector data</CardTitle>
					<CardDescription>Detection results and replay summaries stay in extension storage until you clear them or uninstall Kaiju Site Scope.</CardDescription>
				</CardHeader>
				<CardContent class="grid gap-4">
					<div class="grid grid-cols-2 gap-2">
						<SettingMetric label="Cached analyses" value={panel.status.totalAnalyses} />
						<SettingMetric label="Tracked origins" value={panel.status.trackedOrigins} />
					</div>
					<Button
						variant="outline"
						disabled={panel.clearStoredDataInFlight()}
						onClick={() => void panel.clearStoredData()}
					>
						{panel.clearStoredDataInFlight() ? 'Clearing detector data' : 'Clear detector data'}
					</Button>
				</CardContent>
			</Card>

			<Card size="sm">
				<CardHeader>
					<CardTitle>Crash diagnostics</CardTitle>
					<CardDescription>
						Kaiju keeps a bounded local diagnostic journal with lifecycle states, errors, timings, and redacted support fields. It does not intentionally store raw page HTML, cookies, authorization values, or request bodies in the journal.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ButtonLink to="/diagnostics" variant="outline">Open diagnostics</ButtonLink>
				</CardContent>
			</Card>
		</>
	);
}

function SettingMetric(props: { readonly label: string; readonly value: number }) {
	return (
		<div class="rounded-lg border border-white/8 bg-white/[0.025] p-3">
			<p class="panel-label">{props.label}</p>
			<p class="mt-1 text-lg font-semibold text-white">{props.value}</p>
		</div>
	);
}
