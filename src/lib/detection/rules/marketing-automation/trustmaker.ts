import type { TechnologyDefinition } from '../../types';

export const trustmakerTechnologyDefinition = {
	id: "trustmaker",
	name: "Trustmaker",
	website: "https://thetrustmaker.com",
	description: "Trustmaker is a platform that provides customizable social proof messages, FOMO campaign tools, and Conversion Rate Optimization (CRO) solutions.",
	icon: "Trustmaker.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "trustmaker:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.getcue\\.app\\/"),
			description: "Script source URL matches a known technology marker.",
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
