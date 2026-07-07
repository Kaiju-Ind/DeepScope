import type { TechnologyDefinition } from '../../types';

export const musementTechnologyDefinition = {
	id: "musement",
	name: "Musement",
	website: "https://www.musement.com",
	description: "Musement is a platform that allows users to book tickets for attractions, museums, and activities, providing access to various cultural and entertainment experiences.",
	icon: "Musement.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "musement:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.musement\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
