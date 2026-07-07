import type { TechnologyDefinition } from '../../types';

export const calendarwizTechnologyDefinition = {
	id: "calendarwiz",
	name: "CalendarWiz",
	website: "https://www.calendarwiz.com/",
	description: "CalendarWiz is an online scheduling calendar.",
	icon: "CalendarWiz.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "calendarwiz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.calendarwiz\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
