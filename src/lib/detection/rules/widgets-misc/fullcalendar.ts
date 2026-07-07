import type { TechnologyDefinition } from '../../types';

export const fullcalendarTechnologyDefinition = {
	id: "fullcalendar",
	name: "FullCalendar",
	website: "https://fullcalendar.io",
	description: "FullCalendar is a full-sized drag and drop JavaScript event calendar.",
	icon: "FullCalendar.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "fullcalendar:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/fullcalendar\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fullcalendar:jsGlobal:1",
			kind: "jsGlobal",
			property: "FullCalendar.version",
			valuePattern: new RegExp("^([\\d\\.\\-\\w]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
		],
	},
	implies: [
		"typescript",
	],
} as const satisfies TechnologyDefinition;
