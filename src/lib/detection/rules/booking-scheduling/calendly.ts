import type { TechnologyDefinition } from '../../types';

export const calendlyTechnologyDefinition = {
	id: "calendly",
	name: "Calendly",
	website: "https://calendly.com/",
	description: "Calendly is an app for scheduling appointments, meetings, and events.",
	icon: "Calendly.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "calendly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.calendly\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "calendly:dom:1",
			kind: "dom",
			selector: "a[href*='//calendly.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "calendly:jsGlobal:2",
			kind: "jsGlobal",
			property: "Calendly",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "calendly:jsGlobal:3",
			kind: "jsGlobal",
			property: "Calendly.closePopupWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "calendly:jsGlobal:4",
			kind: "jsGlobal",
			property: "Calendly.showPopupWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
		],
	},
} as const satisfies TechnologyDefinition;
