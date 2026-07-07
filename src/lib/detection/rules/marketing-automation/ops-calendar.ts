import type { TechnologyDefinition } from '../../types';

export const opsCalendarTechnologyDefinition = {
	id: "ops-calendar",
	name: "Ops Calendar",
	website: "https://opscalendar.com",
	description: "Ops Calendar is a marketing calendar to manage content marketing, social media, and more.",
	icon: "OpsCalendar.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "ops-calendar:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.opscalendar\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
