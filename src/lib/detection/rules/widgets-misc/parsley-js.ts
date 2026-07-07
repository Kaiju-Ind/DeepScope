import type { TechnologyDefinition } from '../../types';

export const parsleyJsTechnologyDefinition = {
	id: "parsley-js",
	name: "Parsley.js",
	website: "https://parsleyjs.org",
	description: "Javascript forms validation script.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "parsley-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("parsley(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "parsley-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "parsley",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
