import type { TechnologyDefinition } from '../../types';

export const scheduleanyoneTechnologyDefinition = {
	id: "scheduleanyone",
	name: "ScheduleAnyone",
	website: "https://www.scheduleanyone.com",
	description: "Schedule Anyone is a business management system designed to streamline operations with a focus on automation.",
	icon: "ScheduleAnyone.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "scheduleanyone:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.ScheduleAnyone\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "scheduleanyone:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("www\\.scheduleanyone\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
