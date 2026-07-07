import type { TechnologyDefinition } from '../../types';

export const snipercrmTechnologyDefinition = {
	id: "snipercrm",
	name: "SniperCRM",
	website: "https://snipercrm.io",
	description: "SniperCRM is a platform designed to automate, manage, and scale ecommerce operations.",
	icon: "SniperCRM.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "snipercrm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.snipercrm\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
