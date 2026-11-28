import type { TechnologyDefinition } from "../../types.ts";

/** Detects authored opt-in to customizable native select controls, stable in Chrome 134 and expanded in Chrome 135. */
export const customizableSelectTechnologyDefinition: TechnologyDefinition = {
	id: 'customizable-select',
	name: 'Customizable select',
	website: 'https://developer.chrome.com/blog/a-customizable-select',
	description:
		'Customizable select lets authors opt native select controls into richer HTML content and CSS styling while keeping native form behavior.',
	categories: ['api-pattern'],
	rules: [
		{
			id: 'customizable-select:html:base-select',
			kind: 'html',
			pattern: /(?<!-)\bappearance\s*:\s*base-select(?![a-z0-9_-])/i,
			confidence: 100,
			description: 'Inline CSS opts a select control into customizable rendering with appearance: base-select.',
		},
		{
			id: 'customizable-select:stylesheetContent:base-select',
			kind: 'stylesheetContent',
			pattern: /(?<!-)\bappearance\s*:\s*base-select(?![a-z0-9_-])/i,
			confidence: 100,
			description: 'Stylesheet CSS opts a select control into customizable rendering with appearance: base-select.',
		},
		{
			id: 'customizable-select:dom:selectedcontent',
			kind: 'dom',
			selector: 'select selectedcontent',
			confidence: 100,
			description: 'Rendered select markup contains the selectedcontent element used by customizable selects.',
		},
		{
			id: 'customizable-select:html:selectedcontent',
			kind: 'html',
			pattern: /<selectedcontent(?=[\s/>])/i,
			confidence: 100,
			description: 'Captured HTML contains the selectedcontent element used by customizable selects.',
		},
	],
} as const satisfies TechnologyDefinition;
