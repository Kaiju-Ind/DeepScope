import type { TechnologyDefinition } from '../../types';

export const pointatTechnologyDefinition = {
	id: "pointat",
	name: "Pointat",
	website: "https://pointat.app",
	description: "Pointat is a loyalty system designed to help retail businesses increase store sales by up to three times through structured customer engagement and rewards management.",
	icon: "Pointat.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "pointat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("my\\.pointat\\.app"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pointat:jsGlobal:1",
			kind: "jsGlobal",
			property: "pointatData.customer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
