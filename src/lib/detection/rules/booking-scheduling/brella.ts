import type { TechnologyDefinition } from '../../types';

export const brellaTechnologyDefinition = {
	id: "brella",
	name: "Brella",
	website: "https://www.brella.io",
	description: "Brella is an event networking platform that matches attendees, enables meeting scheduling, and supports in-person, virtual, and hybrid events.",
	icon: "Brella.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "brella:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.brella\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
