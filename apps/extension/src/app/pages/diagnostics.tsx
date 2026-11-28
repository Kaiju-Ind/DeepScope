import { DiagnosticsView } from "../components/diagnostics-view.tsx";
import { usePanel } from "../panel/context.ts";

/** Side-panel diagnostics route with a link to the independent full-page surface. */
export function DiagnosticsPage() {
	const panel = usePanel();
	return <DiagnosticsView showOpenFullPage tabId={panel.visibleTabIdentity()?.tabId} />;
}
