import type { TechnologyDefinition } from '../../types';

export const doorbellTechnologyDefinition = {
	id: "doorbell",
	name: "Doorbell",
	website: "https://doorbell.io",
	description: "Doorbell is a platform that enables the collection, management, and analysis of customer feedback.",
	icon: "Doorbell.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "doorbell:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.doorbell\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "doorbell:jsGlobal:1",
			kind: "jsGlobal",
			property: "Doorbell",
			description: "Page-owned global matches a known technology marker.",
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
