import type { TechnologyDefinition } from '../../types';

export const simlaTechnologyDefinition = {
	id: "simla",
	name: "Simla",
	website: "https://www.simla.com",
	description: "Simla is a multi-agent, all-in-one solution for businesses selling products and services through WhatsApp, Facebook, Instagram, and websites.",
	icon: "Simla.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "simla:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.retailcrm\\.tech\\/"),
			description: "Script source URL matches a known technology marker.",
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
