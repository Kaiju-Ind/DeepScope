import type { TechnologyDefinition } from '../../types';

export const monetizeProTechnologyDefinition = {
	id: "monetize-pro",
	name: "Monetize Pro",
	website: "https://monetizepro.ai",
	description: "Monetize Pro is a platform that helps users earn money through various monetization strategies for their online content.",
	icon: "MonetizePro.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "monetize-pro:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.monetizepro\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
