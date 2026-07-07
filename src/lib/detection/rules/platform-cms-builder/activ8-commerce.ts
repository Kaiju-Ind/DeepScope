import type { TechnologyDefinition } from '../../types';

export const activ8CommerceTechnologyDefinition = {
	id: "activ8-commerce",
	name: "Activ8 Commerce",
	website: "https://activ8commerce.com",
	description: "Activ8 Commerce is a sales solution tailored for winery and distillery businesses.",
	icon: "Activ8.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "activ8-commerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/activ8-commerce\\/"),
			description: "Script source URL matches a known technology marker.",
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
