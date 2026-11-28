import { createSignal, onMount } from 'solid-js';
import { openDiagnostics } from '../browser/surface.ts';

import type { DiagnosticSurface } from "../../lib/diagnostics/contracts.ts";
import * as clipboard from '../../utils/clipboard.ts';
import { persistDiagnosticFailure } from "../../lib/diagnostics/journal/index.ts";

export type SupportFallbackPropsType = {
	readonly surface: Extract<DiagnosticSurface, 'sidepanel' | 'popup' | 'page' | 'options'>;
	readonly error: unknown;
	readonly reset?: () => void;
};

/** Minimal support UI that avoids Zaidan primitives when the normal application tree fails. */
export function SupportFallback(props: SupportFallbackPropsType) {
	const [status, setStatus] = createSignal('');
	/** Expose the current error message with a string fallback for non-Error failures. */
	const message = () => props.error instanceof Error ? props.error.message : String(props.error);

	onMount(() => {
		persistDiagnosticFailure({
			surface: props.surface,
			category: ['kaiju-deepscope', props.surface, 'render'],
			message: 'The extension UI entered its support fallback.',
			error: props.error,
		});
	});

	/** Load diagnostics on demand, copy the current report and keep preparation or failure status visible in the fallback UI. */
	async function copyReport(): Promise<void> {
		setStatus('Preparing report…');
		try {
			const { formatDiagnosticReport, getDiagnosticSnapshot } = await import('../../lib/diagnostics/report.ts');
			const report = formatDiagnosticReport(await getDiagnosticSnapshot());
			await clipboard.copy(report);
			setStatus('Diagnostic report copied.');
		} catch (error) {
			setStatus(error instanceof Error ? error.message : 'Unable to copy the diagnostic report.');
		}
	}

	return (
		<main style={{ 'min-height': '100dvh', padding: '1rem', background: '#030812', color: 'white', 'font-family': 'system-ui, sans-serif' }}>
			<p style={{ 'font-size': '0.7rem', 'letter-spacing': '0.08em', 'text-transform': 'uppercase', opacity: 0.6 }}>Kaiju DeepScope</p>
			<h1 style={{ margin: '0.5rem 0 0', 'font-size': '1.25rem' }}>The extension UI stopped unexpectedly</h1>
			<p style={{ 'margin-top': '0.75rem', 'font-size': '0.875rem', 'line-height': 1.6, opacity: 0.72 }}>
				The failure was written to the local diagnostic journal. Copy a report before retrying the interface.
			</p>
			<pre style={{ 'margin-top': '1rem', padding: '0.75rem', 'overflow-wrap': 'anywhere', 'white-space': 'pre-wrap', background: 'rgb(255 255 255 / 0.05)', 'border-radius': '0.75rem', 'font-size': '0.75rem' }}>{message()}</pre>
			<div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap', 'margin-top': '1rem' }}>
				<button type="button" onClick={() => void copyReport()} style={buttonStyle}>Copy diagnostic report</button>
				{props.surface !== 'options' && (
					<button type="button" onClick={() => void openDiagnostics()} style={buttonStyle}>Open diagnostics page</button>
				)}
				{props.reset && <button type="button" onClick={props.reset} style={buttonStyle}>Retry UI</button>}
			</div>
			{status() && <p style={{ 'margin-top': '0.75rem', 'font-size': '0.75rem', opacity: 0.68 }}>{status()}</p>}
		</main>
	);
}

const buttonStyle = {
	border: '1px solid rgb(255 255 255 / 0.18)',
	'border-radius': '0.65rem',
	padding: '0.55rem 0.75rem',
	background: 'rgb(255 255 255 / 0.06)',
	color: 'white',
	cursor: 'pointer',
} as const;
