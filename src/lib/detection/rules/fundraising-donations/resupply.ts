import type { TechnologyDefinition } from '../../types';

export const resupplyTechnologyDefinition = {
	id: "resupply",
	name: "Resupply",
	website: "https://resupplyapp.com",
	description: "Resupply is a service that offers 24-hour furniture donation pickups, supporting local nonprofits by facilitating the collection and redistribution of donated items.",
	icon: "Resupply.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "resupply:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.resupplyapp\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
