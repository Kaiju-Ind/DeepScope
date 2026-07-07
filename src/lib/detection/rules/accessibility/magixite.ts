import type { TechnologyDefinition } from '../../types';

export const magixiteTechnologyDefinition = {
	id: "magixite",
	name: "Magixite",
	website: "https://acc.magixite.com",
	description: "Magixite offers the Web Content Accessibility Guidelines (WCAG), a set of guidelines and requirements designed to help designers and developers improve the accessibility of web content, ensuring it can be effectively used by individuals with disabilities.",
	icon: "Magixite.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "magixite:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("acc\\.magixite\\.com\\/"),
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
