import type { TechnologyDefinition } from '../../types';

export const stampedTechnologyDefinition = {
	id: "stamped",
	name: "Stamped",
	website: "https://stamped.io/",
	description: "Stamped is a provider of reviews and ratings solution.",
	icon: "Stamped.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "stamped:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.stamped\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "stamped:jsGlobal:1",
			kind: "jsGlobal",
			property: "StampedFn",
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
