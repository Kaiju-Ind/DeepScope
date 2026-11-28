import type { TechnologyDefinition } from "../../types.ts";

/** Detects authored use of the dialog `closedby` attribute, stable in Chrome 134. */
export const dialogClosedbyTechnologyDefinition: TechnologyDefinition = {
	id: 'dialog-closedby',
	name: 'Dialog closedby',
	website: 'https://html.spec.whatwg.org/multipage/interactive-elements.html#attr-dialog-closedby',
	description: 'The closedby attribute controls which user actions can close a dialog element.',
	categories: ['api-pattern'],
	rules: [
		{
			id: 'dialog-closedby:dom:attribute',
			kind: 'dom',
			selector: 'dialog[closedby]',
			attribute: 'closedby',
			valuePattern: /^(?:none|closerequest|any)$/i,
			confidence: 100,
			description: 'Rendered DOM contains a dialog with a defined closedby value.',
		},
		{
			id: 'dialog-closedby:html:attribute',
			kind: 'html',
			pattern: /<dialog(?=[\s>])[^>]*\sclosedby\s*=\s*(?:"(?:none|closerequest|any)"|'(?:none|closerequest|any)'|(?:none|closerequest|any)(?=[\s/>]))/i,
			confidence: 100,
			description: 'Captured HTML declares a defined closedby value on a dialog element.',
		},
	],
} as const satisfies TechnologyDefinition;
