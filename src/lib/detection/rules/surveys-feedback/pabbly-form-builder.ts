import type { TechnologyDefinition } from '../../types';

export const pabblyFormBuilderTechnologyDefinition = {
	id: "pabbly-form-builder",
	name: "Pabbly Form Builder",
	website: "https://www.pabbly.com",
	description: "Pabbly Form Builder is a no-code tool for creating professional business forms, offering customization options without requiring programming skills.",
	icon: "Pabbly.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "pabbly-form-builder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("forms\\.pabbly\\.com"),
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
