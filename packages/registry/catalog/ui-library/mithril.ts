import type { TechnologyDefinition } from "../../types.ts";

/**
 * Second source fragment for `mithril-js`. It was a separate `mithril` id, so one
 * product was reported twice; the registry merges fragments that share an id.
 */
export const mithrilTechnologyDefinition: TechnologyDefinition = {
	id: 'mithril-js',
	name: 'Mithril',
	website: 'https://mithril.js.org/',
	description: 'A Javascript Framework for building applications.',
	icon: 'Mithril.svg',
	categories: [
		'ui-library',
		'widgets-misc',
	],
	rules: [
		{
			id: 'mithril-js:scriptSrc:versioned-0',
			kind: 'scriptSrc',
			pattern: new RegExp('mithril(?:[\\.-]min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'mithril-js:scriptSrc:versioned-1',
			kind: 'scriptSrc',
			pattern: new RegExp('(?:((?:\\d{1,9}\\.){1,12}\\d+)\\/)?mithril(?:[\\.-]min)?\\.js'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
