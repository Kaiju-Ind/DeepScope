import type { TechnologyDefinition } from '../../types';

export const novomindIshopTechnologyDefinition = {
	id: "novomind-ishop",
	name: "novomind iSHOP",
	website: "https://www.novomind.com/en/shopsystem/novomind-ishop-software",
	description: "novomind iSHOP can be introduced rapidly, is highly scalable, has open APIs headless ecommerce and GDPR-compliant in the novomind Cloud.",
	icon: "novomind.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "novomind-ishop:jsGlobal:0",
			kind: "jsGlobal",
			property: "_ishopevents",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "novomind-ishop:jsGlobal:1",
			kind: "jsGlobal",
			property: "_ishopevents_url",
			valuePattern: new RegExp("\\/ishop-api\\/events\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "novomind-ishop:jsGlobal:2",
			kind: "jsGlobal",
			property: "iShop.config.baseUrl",
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
