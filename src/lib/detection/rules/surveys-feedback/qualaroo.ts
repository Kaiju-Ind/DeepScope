import type { TechnologyDefinition } from '../../types';

export const qualarooTechnologyDefinition = {
	id: "qualaroo",
	name: "Qualaroo",
	website: "https://qualaroo.com",
	description: "Qualaroo provides surveys on websites and apps to get user feedback.",
	icon: "Qualaroo.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "qualaroo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.qualaroo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "qualaroo:dom:1",
			kind: "dom",
			selector: "link[href*='.qualaroo.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "qualaroo:jsGlobal:2",
			kind: "jsGlobal",
			property: "QUALAROO_DNT",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
