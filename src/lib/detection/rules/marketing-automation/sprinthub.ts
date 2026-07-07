import type { TechnologyDefinition } from '../../types';

export const sprinthubTechnologyDefinition = {
	id: "sprinthub",
	name: "SprintHub",
	website: "https://lp.sprinthub.com",
	description: "SprintHub is an all-in-one marketing platform.",
	icon: "SprintHub.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "sprinthub:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sprinthub\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sprinthub:jsGlobal:1",
			kind: "jsGlobal",
			property: "SprintHUB",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sprinthub:jsGlobal:2",
			kind: "jsGlobal",
			property: "SprintHUBLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
