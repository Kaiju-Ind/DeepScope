import type { TechnologyDefinition } from '../../types';

export const clickguardTechnologyDefinition = {
	id: "clickguard",
	name: "ClickGUARD",
	website: "https://www.clickguard.com",
	description: "ClickGUARD is anti-click fraud prevention software designed to detect and block invalid or fraudulent clicks in online advertising campaigns.",
	icon: "ClickGUARD.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "clickguard:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("io\\.clickguard\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
