import type { TechnologyDefinition } from '../../types';

export const pozvonimTechnologyDefinition = {
	id: "pozvonim",
	name: "Pozvonim",
	website: "https://pozvonim.com",
	description: "Pozvonim is a call tracking and visitor retention service that records and analyzes incoming calls, monitors visitor behavior, and provides tools to help businesses track customer interactions and engagement across websites.",
	icon: "Pozvonim.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "pozvonim:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.pozvonim\\.com"),
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
