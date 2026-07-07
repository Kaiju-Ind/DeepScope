import type { TechnologyDefinition } from '../../types';

export const verasafeTechnologyDefinition = {
	id: "verasafe",
	name: "VeraSafe",
	website: "https://verasafe.com",
	description: "VeraSafe is a privacy compliance system designed to help organizations adhere to global data protection regulations and maintain compliance with privacy laws.",
	icon: "VeraSafe.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "verasafe:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.verasafe\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
