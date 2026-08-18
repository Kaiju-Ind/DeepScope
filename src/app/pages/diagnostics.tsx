import { DiagnosticsView } from '@/app/components/diagnostics-view';
import { usePanel } from '@/app/context';

/** Side-panel diagnostics route with a link to the independent full-page surface. */
export function DiagnosticsPage() {
	const panel = usePanel();
	return <DiagnosticsView showOpenFullPage tabId={panel.visibleTabIdentity()?.tabId} />;
}
