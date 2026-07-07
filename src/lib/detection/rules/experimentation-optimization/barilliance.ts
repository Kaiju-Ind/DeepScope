import type { TechnologyDefinition } from '../../types';

export const barillianceTechnologyDefinition = {
	id: "barilliance",
	name: "Barilliance",
	website: "https://www.barilliance.com",
	description: "Barilliance is an ecommerce personalisation tools including cart abandonment emails, personalised product recommendations, onsite personalisation, and live notifications.",
	icon: "Barilliance.png",
	categories: [
		"experimentation-optimization",
		"commerce-operations",
	],
	rules: [
		{
			id: "barilliance:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.barilliance\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
