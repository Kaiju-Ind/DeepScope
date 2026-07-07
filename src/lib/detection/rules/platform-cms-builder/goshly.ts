import type { TechnologyDefinition } from '../../types';

export const goshlyTechnologyDefinition = {
	id: "goshly",
	name: "Goshly",
	website: "https://www.goshly.com",
	description: "Goshly is a platform that builds responsive websites for both desktop and mobile, offering features like ecommerce integration and shopping cart functionality.",
	icon: "Goshly.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "goshly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.goshlyanalytics\\.com\\/"),
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
