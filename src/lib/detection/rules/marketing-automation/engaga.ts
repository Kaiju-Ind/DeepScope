import type { TechnologyDefinition } from '../../types';

export const engagaTechnologyDefinition = {
	id: "engaga",
	name: "Engaga",
	website: "https://www.engaga.com",
	description: "Engaga is a platform that enhances website effectiveness with call-to-action popups and popup forms designed to convert visitors into customers and subscribers.",
	icon: "Engaga.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "engaga:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("spark\\.engaga\\.com"),
			description: "Script source URL matches a known technology marker.",
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
