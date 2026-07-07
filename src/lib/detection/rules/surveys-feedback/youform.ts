import type { TechnologyDefinition } from '../../types';

export const youformTechnologyDefinition = {
	id: "youform",
	name: "Youform",
	website: "https://youform.com",
	description: "Youform is a no-code form builder to create conversational style forms for collecting leads, surveys, and feedback.",
	icon: "Youform.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "youform:jsGlobal:0",
			kind: "jsGlobal",
			property: "youForm.blurActiveElement",
			description: "Page-owned global matches a known technology marker.",
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
