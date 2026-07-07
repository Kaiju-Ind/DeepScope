import type { TechnologyDefinition } from '../../types';

export const warplyTechnologyDefinition = {
	id: "warply",
	name: "Warply",
	website: "https://warp.ly",
	description: "Warply is a customer loyalty platform that enables businesses to manage rewards, track engagement, and enhance customer retention through targeted campaigns.",
	icon: "Warply.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "warply:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.warp\\.ly"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
