import type { TechnologyDefinition } from '../../types';

export const negateTechnologyDefinition = {
	id: "negate",
	name: "Negate",
	website: "https://negate.io",
	description: "Negate is a security service that provides premium bot protection for websites, blocking malicious bots in real time.",
	icon: "Negate.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "negate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sapi\\.negate\\.io"),
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
