import type { TechnologyDefinition } from '../../types';

export const jamedaTechnologyDefinition = {
	id: "jameda",
	name: "Jameda",
	website: "https://www.jameda.de",
	description: "Jameda is an online appointment scheduling system for doctors, enabling patients to book medical consultations.",
	icon: "Jameda.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "jameda:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn1\\.jameda-elements\\.de\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jameda:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn1.\\jameda-elements\\.de\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
