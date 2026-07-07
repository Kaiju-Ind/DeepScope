import type { TechnologyDefinition } from '../../types';

export const fomoTechnologyDefinition = {
	id: "fomo",
	name: "Fomo",
	website: "https://fomo.com",
	description: "Fomo is a social proof marketing platform.",
	icon: "Fomo.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "fomo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("fomo\\.com\\/api\\/v"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fomo:jsGlobal:1",
			kind: "jsGlobal",
			property: "fomo.version",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
