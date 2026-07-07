import type { TechnologyDefinition } from '../../types';

export const softrTechnologyDefinition = {
	id: "softr",
	name: "Softr",
	website: "https://www.softr.io",
	description: "Softr is a tool designed to help users build custom websites, web apps, clients portals, or internal tools using Airtable or Google Sheets data.",
	icon: "Softr.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "softr:dom:0",
			kind: "dom",
			selector: "link[href*='softr']",
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
		cpe: "cpe:2.3:a:softr:softr:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
