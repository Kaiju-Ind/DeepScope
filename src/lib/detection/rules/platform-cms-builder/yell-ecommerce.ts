import type { TechnologyDefinition } from '../../types';

export const yellEcommerceTechnologyDefinition = {
	id: "yell-ecommerce",
	name: "Yell eCommerce",
	website: "https://business.yell.com/features/websites/ecommerce/",
	description: "Yell eCommerce is a service providing eCommerce website design focused on attracting customers and increasing sales.",
	icon: "YelleCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "yell-ecommerce:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("business\\.yell\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
