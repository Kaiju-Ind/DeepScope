import type { TechnologyDefinition } from "../../types.ts";

/** Detects authored use of the CSS Ruby overhang property shipped in Chromium 151. */
export const cssRubyOverhangTechnologyDefinition: TechnologyDefinition = {
	id: 'css-ruby-overhang',
	name: 'CSS ruby-overhang',
	website: 'https://drafts.csswg.org/css-ruby-1/#ruby-overhang',
	description: 'The ruby-overhang property controls whether ruby annotations can overhang adjacent base text.',
	categories: ['styling-processor'],
	rules: [
		{
			id: 'css-ruby-overhang:html:property',
			kind: 'html',
			pattern: /(?<!-)\bruby-overhang\s*:\s*(?:auto|spaces|none)(?![a-z0-9_-])/i,
			confidence: 100,
			description: 'Inline CSS sets the ruby-overhang property to a defined keyword.',
		},
		{
			id: 'css-ruby-overhang:stylesheetContent:property',
			kind: 'stylesheetContent',
			pattern: /(?<!-)\bruby-overhang\s*:\s*(?:auto|spaces|none)(?![a-z0-9_-])/i,
			confidence: 100,
			description: 'Stylesheet CSS sets the ruby-overhang property to a defined keyword.',
		},
	],
} as const satisfies TechnologyDefinition;
