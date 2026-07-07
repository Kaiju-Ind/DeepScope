import type { TechnologyDefinition } from '../../types';

export const keptifyTechnologyDefinition = {
	id: "keptify",
	name: "Keptify",
	website: "https://keptify.com",
	description: "Keptify helps ecommerce sites of any size to increase sales and conversion rates by providing visitors with a personalised shopping experience.",
	icon: "Keptify.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "keptify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.keptify\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "keptify:jsGlobal:1",
			kind: "jsGlobal",
			property: "KEPTIFY_BASE_URL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "keptify:jsGlobal:2",
			kind: "jsGlobal",
			property: "_keptify.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
