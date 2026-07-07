import type { TechnologyDefinition } from '../../types';

export const timetapTechnologyDefinition = {
	id: "timetap",
	name: "TimeTap",
	website: "https://timetap.com",
	description: "TimeTap is a scheduling automation platform that helps organizations manage and customize appointment booking workflows to streamline scheduling operations.",
	icon: "TimeTap.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "timetap:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.timetap\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "timetap:dom:1",
			kind: "dom",
			selector: "iframe[src*='www.timetap.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
