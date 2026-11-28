import { categories } from "@deepscope/registry/categories";
import type { CategoryId } from "@deepscope/registry/types";
import type { DetectionResult } from "@deepscope/detection/types";

/**
 * Detection group rendered by `CategoryGroup`.
 */
export type CategoryGroup = {
	/** Primary category id chosen from the first category on each detection. */
	category: string;
	/** Human-readable category label from the category metadata table. */
	label: string;
	/** Sort priority from category metadata. Lower values render first. */
	priority: number;
	/** Detection results that belong to this primary category. */
	results: DetectionResult[];
};

/**
 * Groups detections by their primary category for the current side panel layout.
 *
 * A technology can belong to multiple categories, but phase 6 preserves the
 * current one-card-per-technology layout by choosing `categories[0]`. Keeping
 * that rule here makes it a visible UI compatibility choice instead of hiding it
 * inside the Solid component.
 */
export function groupDetectionsByPrimaryCategory(
	results: readonly DetectionResult[],
): CategoryGroup[] {
	const grouped = results.reduce<Record<string, DetectionResult[]>>(
		(groups, result) => {
			const category = result.categories[0] ?? 'unknown';
			return Object.assign({}, groups, {
				[category]: [...(groups[category] ?? []), result],
			});
		},
		{},
	);

	return Object.entries(grouped)
		.map(([category, categoryResults]) => {
			const meta = categories[category as CategoryId] ?? categories.unknown;
			return {
				category,
				label: meta.label,
				priority: meta.priority,
				results: categoryResults,
			};
		})
		.sort((a, b) => a.priority - b.priority || a.label.localeCompare(b.label));
}
