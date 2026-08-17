import { For } from 'solid-js';

import type { DetectionResult } from '@/lib/detection/types';
import type { PanelExplanationLookup } from '@/lib/panel/view-model';
import { TechnologyCard } from './TechnologyCard';

export function CategoryGroup(props: {
	/** Human-readable category heading. */
	label: string;
	/** Detection results grouped under this category. */
	results: DetectionResult[];
	/** Technology ids that should receive the late-detection badge. */
	newDetectionIds?: string[];
	/** Whether every result in the group should render as pending. */
	pendingResults?: boolean;
	/** Explanation summaries keyed by technology id. */
	explanationsByTechnologyId?: PanelExplanationLookup;
}) {
	return (
		<section class="category-group">
			<h3>{props.label}</h3>
			<div class="stats-grid">
				<For each={props.results}>
					{(result) => (
						<TechnologyCard
							result={result}
							isNew={props.newDetectionIds?.includes(result.technologyId)}
							isPending={props.pendingResults}
							explanation={props.explanationsByTechnologyId?.[result.technologyId]}
						/>
					)}
				</For>
			</div>
		</section>
	);
}

export default CategoryGroup;
