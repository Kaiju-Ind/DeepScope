import { Show } from 'solid-js';

import type { AnalysisActivity } from "../model/matcher.ts";
import { Progress } from "../../ui/progress.tsx";
import { Spinner } from "../../ui/spinner.tsx";

/** Visible analysis activity with determinate matcher progress when available. */
export function AnalysisProgress(props: { readonly activity: AnalysisActivity }) {
	return (
		<div class="panel-section grid gap-3 p-3" role="status" aria-live="polite">
			<div class="flex items-start gap-3">
				<Show when={props.activity.progress.kind !== 'determinate'}>
					<Spinner class="mt-0.5 size-4 text-kaiju-cyan" />
				</Show>
				<div class="min-w-0 flex-1">
					<div class="flex items-center justify-between gap-3">
						<p class="text-sm font-medium text-white">{props.activity.headline}</p>
						<Show when={props.activity.progress.kind === 'determinate'}>
							<span class="font-mono text-[0.6875rem] text-white/42">
								{getProgressLabel(props.activity)}
							</span>
						</Show>
					</div>
					<p class="mt-1 text-xs leading-5 text-white/48">{props.activity.description}</p>
				</div>
			</div>
			<Show when={props.activity.progress.kind === 'determinate'}>
				<Progress value={getProgressPercent(props.activity)} aria-label="Technology analysis progress" />
			</Show>
		</div>
	);
}

/** Use a measured percentage only for determinate work; indeterminate activity starts at zero for the progress primitive. */
function getProgressPercent(activity: AnalysisActivity): number {
	return activity.progress.kind === 'determinate' ? activity.progress.percent : 0;
}

/** Show completed and total counts only when the activity provides a determinate work estimate. */
function getProgressLabel(activity: AnalysisActivity): string {
	return activity.progress.kind === 'determinate'
		? `${activity.progress.completed}/${activity.progress.total}`
		: '';
}
