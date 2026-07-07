import type { TechnologyDefinition } from '../../types';

export const occasionTechnologyDefinition = {
	id: "occasion",
	name: "Occasion",
	website: "https://www.getoccasion.com",
	description: "Occasion is an online booking system.",
	icon: "Occasion.png",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "occasion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.getoccasion\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "occasion:dom:1",
			kind: "dom",
			selector: "iframe[src*='app.getoccasion.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "occasion:dom:2",
			kind: "dom",
			selector: "a[href*='app.getoccasion.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "occasion:jsGlobal:3",
			kind: "jsGlobal",
			property: "OCCSN.stack",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "occasion:jsGlobal:4",
			kind: "jsGlobal",
			property: "occsnMerchantToken",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
