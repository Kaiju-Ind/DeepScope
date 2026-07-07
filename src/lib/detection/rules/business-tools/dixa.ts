import type { TechnologyDefinition } from '../../types';

export const dixaTechnologyDefinition = {
	id: "dixa",
	name: "Dixa",
	website: "https://www.dixa.com",
	description: "Dixa is a customer experience platform designed for consumer brands, enabling management of customer interactions across channels.",
	icon: "Dixa.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "dixa:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.dixa\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dixa:jsGlobal:1",
			kind: "jsGlobal",
			property: "_dixa_.addListener",
			description: "Page-owned global matches a known technology marker.",
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
