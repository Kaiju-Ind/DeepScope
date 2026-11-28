import type { PageSignals } from "../types.ts";

/** Bounded page evidence collected from one live DOM view. */
export type SnapshotType = Pick<
	PageSignals,
	| 'scripts'
	| 'stylesheets'
	| 'links'
	| 'resources'
	| 'requests'
	| 'scriptContents'
	| 'stylesheetContents'
	| 'meta'
	| 'dom'
> & {
	/** Image URLs observed in the live page. */
	images: string[];
};
