import type { TechnologyDefinition } from '../../types';

export const fullOnSportTechnologyDefinition = {
	id: "full-on-sport",
	name: "Full On Sport",
	website: "https://www.fullonsport.com",
	description: "Full On Sport is an online event-registration platform designed for race directors, offering tools to manage sign-ups, participant data, and race operations.",
	icon: "FullOnSport.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "full-on-sport:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.fullonsport\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
