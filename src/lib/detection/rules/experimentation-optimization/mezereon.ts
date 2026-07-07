import type { TechnologyDefinition } from '../../types';

export const mezereonTechnologyDefinition = {
	id: "mezereon",
	name: "Mezereon",
	website: "https://www.mezereon.com",
	description: "Mezereon is an AI-powered platform that provides search, filters, insights, analytics, personalization, autocomplete, and recommendations to help businesses optimize their user experiences.",
	icon: "Mezereon.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "mezereon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.mezereon\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
