import type { TechnologyDefinition } from '../../types';

export const doctenaTechnologyDefinition = {
	id: "doctena",
	name: "Doctena",
	website: "https://www.doctena.at",
	description: "Doctena is an online appointment booking platform that allows users to schedule visits with doctors, dentists, and other healthcare practitioners.",
	icon: "Doctena.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "doctena:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.doctena\\.at"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "doctena:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^PRODDOCTENASESSID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "doctena:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^proddoctenasessid$", "i"),
			description: "Cookie name matches a known technology marker.",
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
