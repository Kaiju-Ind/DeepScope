import type { TechnologyDefinition } from '../../types';

export const matchiTechnologyDefinition = {
	id: "matchi",
	name: "Matchi",
	website: "https://www.matchi.se",
	description: "Matchi is a platform for racket sports enthusiasts to search, book, and play tennis, badminton, table tennis, squash, or padel.",
	icon: "Matchi.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "matchi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.matchi\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
