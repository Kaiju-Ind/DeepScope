import type { TechnologyDefinition } from '../../types';

export const bobgoTechnologyDefinition = {
	id: "bobgo",
	name: "Bobgo",
	website: "https://www.bobgo.co.za",
	description: "Bobgo is a smart shipping and order management solution designed to streamline logistics and simplify order fulfillment for businesses.",
	icon: "Bobgo.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "bobgo:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.bobgo\\.co\\.za"),
			description: "Script content contains a bounded technology signature.",
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
