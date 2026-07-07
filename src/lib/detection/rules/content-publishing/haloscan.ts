import type { TechnologyDefinition } from '../../types';

export const haloscanTechnologyDefinition = {
	id: "haloscan",
	name: "Haloscan",
	website: "https://www.haloscan.com",
	description: "Haloscan is a tool that enables blogs to incorporate trackbacks and comments, allowing users to engage with blog content through discussions and feedback.",
	icon: "Haloscan.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "haloscan:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.haloscan\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
