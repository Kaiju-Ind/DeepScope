import type { TechnologyDefinition } from '../../types';

export const userAccessibilityTechnologyDefinition = {
	id: "user-accessibility",
	name: "User Accessibility",
	website: "https://user-a.co.il",
	description: "User Accessibility is a solution incorporating automated site scanning and machine learning for future updates, while utilising JS to conform to WECAG standards for improved website and application accessibility.",
	icon: "User Accessibility.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "user-accessibility:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/system\\.user-a\\.co\\.il\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
