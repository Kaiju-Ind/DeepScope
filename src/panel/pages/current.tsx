import { ScansPage } from '@/panel/pages/scans';
import { SettingsPage } from '@/panel/pages/settings';
import { TechnologiesPage } from '@/panel/pages/technologies';

/** Preserve the current all-in-one side-panel layout while routes are introduced underneath it. */
export function CurrentPage() {
	return (
		<>
			<ScansPage />
			<SettingsPage />
			<TechnologiesPage />
		</>
	);
}
