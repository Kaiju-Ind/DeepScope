import type { TechnologyDefinition } from '@/lib/detection/types';

/** Detects authored CSS custom functions defined with `@function`, stable in Chrome 139. */
export const cssCustomFunctionsTechnologyDefinition: TechnologyDefinition = {
	id: 'css-custom-functions',
	name: 'CSS custom functions',
	website: 'https://drafts.csswg.org/css-mixins-1/#function-rule',
	description: 'CSS custom functions let authors define reusable functions with the @function rule.',
	categories: ['styling-processor'],
	rules: [
		{
			id: 'css-custom-functions:html:at-rule',
			kind: 'html',
			pattern: /@function\s+--[a-z0-9_-]+\s*\(/i,
			confidence: 100,
			description: 'Inline CSS defines a custom function with the @function rule.',
		},
		{
			id: 'css-custom-functions:stylesheetContent:at-rule',
			kind: 'stylesheetContent',
			pattern: /@function\s+--[a-z0-9_-]+\s*\(/i,
			confidence: 100,
			description: 'Stylesheet CSS defines a custom function with the @function rule.',
		},
	],
} as const satisfies TechnologyDefinition;
