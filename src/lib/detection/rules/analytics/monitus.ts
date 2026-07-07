import type { TechnologyDefinition } from '../../types';

export const monitusTechnologyDefinition = {
	id: "monitus",
	name: "Monitus",
	website: "https://www.monitus.net",
	description: "Monitus is a provider of web analytics tools for online retailers, specialising in developing solutions for the Yahoo Stores platform.",
	icon: "Monitus.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "monitus:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.monitus\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "monitus:jsGlobal:1",
			kind: "jsGlobal",
			property: "monitus",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	requires: [
		"yahoo-ecommerce",
	],
} as const satisfies TechnologyDefinition;
