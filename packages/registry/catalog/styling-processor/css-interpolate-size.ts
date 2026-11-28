import type { TechnologyDefinition } from "../../types.ts";

/** Detects authored use of CSS intrinsic-size interpolation, stable in Chrome 129. */
export const cssInterpolateSizeTechnologyDefinition: TechnologyDefinition = {
	id: 'css-interpolate-size',
	name: 'CSS interpolate-size',
	website: 'https://drafts.csswg.org/css-values-5/#interpolate-size',
	description:
		'The interpolate-size property lets authors opt intrinsic sizing keywords such as auto into CSS size animations and transitions.',
	categories: ['styling-processor'],
	rules: [
		{
			id: 'css-interpolate-size:html:property',
			kind: 'html',
			pattern: /(?<!-)\binterpolate-size\s*:\s*(?:numeric-only|allow-keywords)(?![a-z0-9_-])/i,
			confidence: 100,
			description: 'Inline CSS sets interpolate-size to one of its defined keyword values.',
		},
		{
			id: 'css-interpolate-size:stylesheetContent:property',
			kind: 'stylesheetContent',
			pattern: /(?<!-)\binterpolate-size\s*:\s*(?:numeric-only|allow-keywords)(?![a-z0-9_-])/i,
			confidence: 100,
			description: 'Stylesheet CSS sets interpolate-size to one of its defined keyword values.',
		},
	],
} as const satisfies TechnologyDefinition;
