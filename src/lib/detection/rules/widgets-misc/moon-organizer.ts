import type { TechnologyDefinition } from '../../types';

export const moonOrganizerTechnologyDefinition = {
	id: "moon-organizer",
	name: "Moon Organizer",
	website: "https://moonorganizer.com",
	description: "Moon Organizer is a platform that tracks lunar cycles, phases, and moon-related events to support planning and provide timely updates.",
	icon: "MoonOrganizer.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "moon-organizer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.moonorganizer\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
