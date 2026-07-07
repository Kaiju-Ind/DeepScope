import type { TechnologyDefinition } from '../../types';

export const collectiveAudienceTechnologyDefinition = {
	id: "collective-audience",
	name: "Collective Audience",
	website: "https://beop.collectiveaudience.co",
	description: "Collective Audience is a cloud ecosystem for media and brands on the open web, formerly known as BeOp.",
	icon: "CollectiveAudience.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "collective-audience:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.beop\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "collective-audience:jsGlobal:1",
			kind: "jsGlobal",
			property: "BeOpSDK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "collective-audience:jsGlobal:2",
			kind: "jsGlobal",
			property: "beOpinionAsyncInit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
