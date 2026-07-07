import type { TechnologyDefinition } from '../../types';

export const breadAndButterTechnologyDefinition = {
	id: "bread-and-butter",
	name: "Bread & Butter",
	website: "https://breadbutter.io",
	description: "Bread & Butter is a platform that offers a first-party data CDP for lead generation.",
	icon: "BreadButter.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "bread-and-butter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.breadbutter\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bread-and-butter:jsGlobal:1",
			kind: "jsGlobal",
			property: "BreadButter.breadbutter",
			description: "Page-owned global matches a known technology marker.",
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
