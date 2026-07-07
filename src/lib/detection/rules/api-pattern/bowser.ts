import type { TechnologyDefinition } from '../../types';

export const bowserTechnologyDefinition = {
	id: "bowser",
	name: "bowser",
	website: "https://opencollective.com/bowser",
	description: "A small, fast and rich-API browser/platform/engine detector for both browser and node.",
	categories: [
		"api-pattern",
		"developer-tooling",
	],
	rules: [
		{
			id: "bowser:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/)?bowser(?:\\.min)?(?:[-\\.][\\d\\w]{0,64})?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
