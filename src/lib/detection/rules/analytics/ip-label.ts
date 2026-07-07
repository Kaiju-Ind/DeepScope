import type { TechnologyDefinition } from '../../types';

export const ipLabelTechnologyDefinition = {
	id: "ip-label",
	name: "ip-label",
	website: "https://www.ip-label.com",
	icon: "iplabel.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "ip-label:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("clobs\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ip-label:jsGlobal:1",
			kind: "jsGlobal",
			property: "clobs",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
