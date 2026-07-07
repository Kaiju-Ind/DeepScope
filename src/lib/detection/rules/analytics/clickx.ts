import type { TechnologyDefinition } from '../../types';

export const clickxTechnologyDefinition = {
	id: "clickx",
	name: "Clickx",
	website: "https://www.clickx.io",
	description: "Clickx is a marketing analytics platform that allows users to generate reports and gain insights into marketing campaigns, product pages, ROI, and more.",
	icon: "Clickx.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "clickx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.clickx\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
