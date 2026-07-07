import type { TechnologyDefinition } from '../../types';

export const carchat24TechnologyDefinition = {
	id: "carchat24",
	name: "CarChat24",
	website: "http://carchat24.com",
	description: "CarChat24 is a live chat solution built specifically for the automotive industry to facilitate real-time customer engagement and lead generation.",
	icon: "CarChat24.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "carchat24:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("service11\\.carchat24\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
