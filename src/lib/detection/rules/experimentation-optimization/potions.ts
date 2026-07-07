import type { TechnologyDefinition } from '../../types';

export const potionsTechnologyDefinition = {
	id: "potions",
	name: "Potions",
	website: "https://get-potions.com",
	description: "Potions is a personalisation technology for customising the ecommerce experience for site visitors without the use of cookies.",
	icon: "Potions.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "potions:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.get-potions\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "potions:jsGlobal:1",
			kind: "jsGlobal",
			property: "potions.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
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
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
