import type { TechnologyDefinition } from '../../types';

export const maxxtonTechnologyDefinition = {
	id: "maxxton",
	name: "Maxxton",
	website: "https://maxxton.com",
	description: "Maxxton is a reservation and property management system.",
	icon: "Maxxton.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "maxxton:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.maxxton\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "maxxton:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.maxxton\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
