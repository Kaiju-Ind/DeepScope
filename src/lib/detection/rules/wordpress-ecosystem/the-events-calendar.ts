import type { TechnologyDefinition } from '../../types';

export const theEventsCalendarTechnologyDefinition = {
	id: "the-events-calendar",
	name: "The Events Calendar",
	website: "https://theeventscalendar.com",
	description: "The Events Calendar is a free event management plugin for WordPress.",
	icon: "The Events Calendar.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "the-events-calendar:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/the-events-calendar(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "the-events-calendar:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/the-events-calendar/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "the-events-calendar:jsGlobal:2",
			kind: "jsGlobal",
			property: "TribeCalendar",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "the-events-calendar:jsGlobal:3",
			kind: "jsGlobal",
			property: "tribe_l10n_datatables",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:stellarwp:the_events_calendar:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
