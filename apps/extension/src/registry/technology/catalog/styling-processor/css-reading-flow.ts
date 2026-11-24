import type { TechnologyDefinition } from '@/lib/detection/types';

/** Detects authored use of CSS reading-flow and reading-order, stable in Chrome 137. */
export const cssReadingFlowTechnologyDefinition: TechnologyDefinition = {
	id: 'css-reading-flow',
	name: 'CSS reading flow',
	website: 'https://drafts.csswg.org/css-display-4/#reading-flow',
	description:
		'The reading-flow and reading-order properties let authors align sequential focus and accessibility reading order with visual layouts.',
	categories: ['accessibility', 'styling-processor'],
	rules: [
		{
			id: 'css-reading-flow:html:reading-flow',
			kind: 'html',
			pattern: /(?<!-)\breading-flow\s*:\s*(?:normal|flex-visual|flex-flow|grid-rows|grid-columns|grid-order|source-order)(?![a-z0-9_-])/i,
			confidence: 100,
			description: 'Inline CSS sets reading-flow to a defined keyword.',
		},
		{
			id: 'css-reading-flow:stylesheetContent:reading-flow',
			kind: 'stylesheetContent',
			pattern: /(?<!-)\breading-flow\s*:\s*(?:normal|flex-visual|flex-flow|grid-rows|grid-columns|grid-order|source-order)(?![a-z0-9_-])/i,
			confidence: 100,
			description: 'Stylesheet CSS sets reading-flow to a defined keyword.',
		},
		{
			id: 'css-reading-flow:stylesheetContent:reading-order',
			kind: 'stylesheetContent',
			pattern: /(?<!-)\breading-order\s*:\s*[+-]?\d+(?![a-z0-9_.-])/i,
			confidence: 100,
			description: 'Stylesheet CSS assigns an integer reading-order within a reading-flow container.',
		},
	],
} as const satisfies TechnologyDefinition;
