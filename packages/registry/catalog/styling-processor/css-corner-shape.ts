import type { TechnologyDefinition } from "../../types.ts";

/** Detects authored use of CSS corner shaping, stable in Chrome 139. */
export const cssCornerShapeTechnologyDefinition: TechnologyDefinition = {
	id: 'css-corner-shape',
	name: 'CSS corner-shape',
	website: 'https://drafts.csswg.org/css-borders-4/#corner-shaping',
	description: 'The corner-shape property controls the curvature used with rounded CSS box corners.',
	categories: ['styling-processor'],
	rules: [
		{
			id: 'css-corner-shape:html:property',
			kind: 'html',
			pattern: /(?<!-)\bcorner-shape\s*:/i,
			confidence: 100,
			description: 'Inline CSS declares the corner-shape property.',
		},
		{
			id: 'css-corner-shape:stylesheetContent:property',
			kind: 'stylesheetContent',
			pattern: /(?<!-)\bcorner-shape\s*:/i,
			confidence: 100,
			description: 'Stylesheet CSS declares the corner-shape property.',
		},
	],
} as const satisfies TechnologyDefinition;
