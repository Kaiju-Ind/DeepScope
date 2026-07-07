import type { TechnologyDefinition } from '../../types';

export const kalixTechnologyDefinition = {
	id: "kalix",
	name: "Kalix",
	website: "https://kalixhealth.com",
	description: "Kalix is a HIPAA-compliant electronic medical record, practice management, and telehealth platform designed for dietitians, nutritionists, and other healthcare professionals.",
	icon: "Kalix.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "kalix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.kalixhealth\\.com"),
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
