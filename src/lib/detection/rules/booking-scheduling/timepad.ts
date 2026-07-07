import type { TechnologyDefinition } from '../../types';

export const timepadTechnologyDefinition = {
	id: "timepad",
	name: "Timepad",
	website: "https://afisha.timepad.ru",
	description: "Timepad is a Russian events system for creating, managing, and ticketing events online.",
	icon: "Timepad.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "timepad:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.timepad\\.ru"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
