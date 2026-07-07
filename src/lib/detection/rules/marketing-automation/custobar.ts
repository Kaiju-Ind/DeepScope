import type { TechnologyDefinition } from '../../types';

export const custobarTechnologyDefinition = {
	id: "custobar",
	name: "Custobar",
	website: "https://www.custobar.com",
	description: "Custobar is a customer data platform that enables personalized marketing by leveraging data to tailor campaigns and communications.",
	icon: "Custobar.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "custobar:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("script\\.custobar\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "custobar:jsGlobal:1",
			kind: "jsGlobal",
			property: "custobar.config",
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
