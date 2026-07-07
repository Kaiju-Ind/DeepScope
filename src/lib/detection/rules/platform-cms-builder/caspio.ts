import type { TechnologyDefinition } from '../../types';

export const caspioTechnologyDefinition = {
	id: "caspio",
	name: "Caspio",
	website: "https://www.caspio.com",
	description: "Caspio is an online database platform that enables the creation of business applications, custom forms, and reports without the need for coding.",
	icon: "Caspio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "caspio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.caspio\\.com\\/"),
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
