import type { TechnologyDefinition } from '../../types';

export const provesourceTechnologyDefinition = {
	id: "provesource",
	name: "ProveSource",
	website: "https://provesrc.com",
	description: "ProveSource is a solution to display social proof and boost conversion.",
	icon: "ProveSource.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "provesource:jsGlobal:0",
			kind: "jsGlobal",
			property: "_provesrcAsyncInit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "provesource:jsGlobal:1",
			kind: "jsGlobal",
			property: "provesrc.display",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
