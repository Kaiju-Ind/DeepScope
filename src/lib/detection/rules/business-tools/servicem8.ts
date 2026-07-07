import type { TechnologyDefinition } from '../../types';

export const servicem8TechnologyDefinition = {
	id: "servicem8",
	name: "ServiceM8",
	website: "https://www.servicem8.com",
	description: "ServiceM8 is a field service management application that enables job dispatch, staff location, and communication with employees and clients without phone calls.",
	icon: "ServiceM8.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "servicem8:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("platform\\.servicem8\\.com\\/"),
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
