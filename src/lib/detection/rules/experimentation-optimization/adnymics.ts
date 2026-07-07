import type { TechnologyDefinition } from '../../types';

export const adnymicsTechnologyDefinition = {
	id: "adnymics",
	name: "Adnymics",
	website: "https://adnymics.com",
	description: "Adnymics is a platform that enables personalization in ecommerce by tailoring content, recommendations, and experiences to individual users based on their behavior and preferences.",
	icon: "Adnymics.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "adnymics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("trac\\.adnymics\\.com"),
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
