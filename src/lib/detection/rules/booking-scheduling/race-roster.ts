import type { TechnologyDefinition } from '../../types';

export const raceRosterTechnologyDefinition = {
	id: "race-roster",
	name: "Race Roster",
	website: "https://raceroster.com",
	description: "Race Roster is an event organization platform that provides tools for planning, managing, and tracking endurance events such as races and fundraisers.",
	icon: "RaceRoster.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "race-roster:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.raceroster\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
