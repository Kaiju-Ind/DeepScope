import type { TechnologyDefinition } from '../../types';

export const sitewTechnologyDefinition = {
	id: "sitew",
	name: "SiteW",
	website: "https://www.en.sitew.com",
	description: "SiteW is a French-based company that offers a website building service.",
	icon: "SiteW.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sitew:dom:0",
			kind: "dom",
			selector: "link[href*='.sitew.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
