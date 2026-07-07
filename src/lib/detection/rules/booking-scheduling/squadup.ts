import type { TechnologyDefinition } from '../../types';

export const squadupTechnologyDefinition = {
	id: "squadup",
	name: "SquadUP",
	website: "https://www.squadup.com",
	description: "SquadUP is a white-label event ticketing platform that enables organizers to create, manage, and sell event tickets under their own branding.",
	icon: "SquadUP.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "squadup:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.squadup\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "squadup:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.squadup\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "squadup:jsGlobal:2",
			kind: "jsGlobal",
			property: "SquadupConfig.configValues",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
