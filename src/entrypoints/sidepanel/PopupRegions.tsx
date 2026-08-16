import type { JSX } from 'solid-js';

/**
 * Children passed into a named popup region.
 *
 * The popup uses region components so `App.tsx` can describe what content goes
 * into `hero`, `actions`, `stats`, `feedback`, and `results` while this file
 * owns the repeated layout wrappers, classes, and semantic attributes.
 */
export type PopupRegionChildren = {
	/** Region content supplied by the caller. */
	children: JSX.Element;
};

/** Props for the popup root region. */
export type PopupRootProps = PopupRegionChildren & {
	/** Whether the popup is waiting on a user-visible background request. */
	busy: boolean;
};

/** Props for one metric card in the hero stats region. */
export type PopupStatProps = {
	/** Label that explains the metric value. */
	label: string;
	/** Current metric value rendered with card emphasis. */
	value: JSX.Element;
	/** Visual accent token already defined by the popup stylesheet. */
	accent: 'moss' | 'amber' | 'slate';
};

/** Props for the result panel region. */
export type PopupResultPanelProps = PopupRegionChildren & {
	/** Optional chip rendered beside the panel heading. */
	modeChip?: JSX.Element;
	/** Text explaining the current result and observation state. */
	meta: JSX.Element;
};

/**
 * Named popup regions used by the Solid popup shell.
 *
 * This follows the named-region composition pattern: callers choose which region
 * content to provide, while the component owns layout, semantics, and class
 * names. It avoids growing `App.tsx` through more structural booleans as the UI
 * later gains explanation or replay regions.
 */
export const PopupShell = {
	/** Root landmark for the popup UI. */
	Root(props: PopupRootProps) {
		return <main class="popup-shell" aria-busy={props.busy ? 'true' : 'false'}>{props.children}</main>;
	},

	/** Hero panel that groups product copy, actions, stats, and metrics. */
	Hero(props: PopupRegionChildren) {
		return <section class="hero-panel">{props.children}</section>;
	},

	/** Product copy region at the top of the popup. */
	HeroCopy(props: PopupRegionChildren) {
		return <div class="hero-copy">{props.children}</div>;
	},

	/** Button row for refresh and observation controls. */
	Actions(props: PopupRegionChildren) {
		return <div class="button-row">{props.children}</div>;
	},

	/** Metric-card grid in the hero panel. */
	Stats(props: PopupRegionChildren) {
		return <div class="stats-grid">{props.children}</div>;
	},

	/** One metric card in the hero stats grid. */
	Stat(props: PopupStatProps) {
		return (
			<article class={`stat-card accent-${props.accent}`}>
				<span class="stat-label">{props.label}</span>
				<strong class="stat-value">{props.value}</strong>
			</article>
		);
	},

	/** Small source, host, and live updates metrics below the hero cards. */
	Metrics(props: PopupRegionChildren) {
		return <div class="mini-metrics">{props.children}</div>;
	},

	/** Area for recoverable errors and status notices. */
	Feedback(props: PopupRegionChildren) {
		return <>{props.children}</>;
	},

	/** Replay region for the latest stored summary and bounded replay history. */
	ReplayHistory(props: PopupRegionChildren) {
		return <section class="replay-history" aria-label="Detection replay history">{props.children}</section>;
	},

	/** Result panel that owns the heading, mode chip, and live-result region. */
	ResultPanel(props: PopupResultPanelProps) {
		return (
			<section class="panel result-panel" aria-live="polite">
				<div class="panel-heading">
					<div>
						<p class="panel-kicker">Normalized Results</p>
						<h2>Latest Site Analysis</h2>
					</div>
					{props.modeChip}
				</div>
				<p class="result-meta">{props.meta}</p>
				{props.children}
			</section>
		);
	},
};
