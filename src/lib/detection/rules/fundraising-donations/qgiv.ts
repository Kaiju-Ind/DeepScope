import type { TechnologyDefinition } from '../../types';

export const qgivTechnologyDefinition = {
	id: "qgiv",
	name: "Qgiv",
	website: "https://www.qgiv.com",
	description: "Qgiv is an online fundraising platform helping nonprofit, faith-based, healthcare, and education organisations raise funds.",
	icon: "Qgiv.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "qgiv:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/secure\\.qgiv\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "qgiv:dom:1",
			kind: "dom",
			selector: "a[href*='//secure.qgiv.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
