import type { TechnologyDefinition } from '../../types';

export const sheetMonkeyTechnologyDefinition = {
	id: "sheet-monkey",
	name: "Sheet Monkey",
	website: "https://sheetmonkey.io",
	description: "Sheet Monkey is a form builder that stores data in Google Sheets, eliminating the need for a backend.",
	icon: "SheetMonkey.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "sheet-monkey:dom:0",
			kind: "dom",
			selector: "form[action*='api.sheetmonkey.io/']",
			description: "DOM selector matches a known technology marker.",
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
