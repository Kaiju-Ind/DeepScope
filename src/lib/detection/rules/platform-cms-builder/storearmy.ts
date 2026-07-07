import type { TechnologyDefinition } from '../../types';

export const storearmyTechnologyDefinition = {
	id: "storearmy",
	name: "Storearmy",
	website: "https://storearmy.com",
	description: "Storearmy is a platform that allows you to sell products on your website and manage an online ecommerce store system.",
	icon: "Storearmy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "storearmy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/storearmy\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "storearmy:jsGlobal:1",
			kind: "jsGlobal",
			property: "Storearmy",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
