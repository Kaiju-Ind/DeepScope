import type { TechnologyDefinition } from '../../types';

export const dengroTechnologyDefinition = {
	id: "dengro",
	name: "DenGro",
	website: "https://dengro.com",
	description: "DenGro is a software solution tailored for dental practitioners, facilitating streamlined practice operations.",
	icon: "DenGro.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "dengro:dom:0",
			kind: "dom",
			selector: "form[action*='app.dengro.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "dengro:jsGlobal:1",
			kind: "jsGlobal",
			property: "dengro.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
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
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
