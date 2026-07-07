import type { TechnologyDefinition } from '../../types';

export const datanyzeTechnologyDefinition = {
	id: "datanyze",
	name: "Datanyze",
	website: "https://www.datanyze.com",
	description: "Datanyze is a provider of visitor tracking script, offering sales intelligence and lead generation software solutions.",
	icon: "Datanyze.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "datanyze:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.datanyze\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
