import type { TechnologyDefinition } from '../../types';

export const refericonTechnologyDefinition = {
	id: "refericon",
	name: "Refericon",
	website: "https://refericon.pl/",
	description: "Refericon is a tool that enhances conversion and sales by using referral marketing.",
	icon: "Refericon.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "refericon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/app\\.refericon\\.pl\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
