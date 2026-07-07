import type { TechnologyDefinition } from '../../types';

export const lootlyTechnologyDefinition = {
	id: "lootly",
	name: "Lootly",
	website: "https://lootly.io",
	description: "Lootly is a loyalty and referral marketing automation software suite for ecommerce businesses.",
	icon: "Lootly.png",
	categories: [
		"commerce-operations",
		"marketing-automation",
	],
	rules: [
		{
			id: "lootly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("lootly\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lootly:dom:1",
			kind: "dom",
			selector: "iframe[src*='lootly.io/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "lootly:jsGlobal:2",
			kind: "jsGlobal",
			property: "Lootly.config",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lootly:jsGlobal:3",
			kind: "jsGlobal",
			property: "lootlyWidgetInit",
			description: "Page-owned global matches a known technology marker.",
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
