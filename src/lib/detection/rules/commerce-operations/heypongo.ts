import type { TechnologyDefinition } from '../../types';

export const heypongoTechnologyDefinition = {
	id: "heypongo",
	name: "HeyPongo",
	website: "https://www.heypongo.com",
	description: "HeyPongo is a platform that helps merchants convert visitors into loyal customers and boost revenue through customer engagement tools.",
	icon: "HeyPongo.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "heypongo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.heypongo\\.com"),
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
