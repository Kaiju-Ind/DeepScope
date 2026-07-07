import type { TechnologyDefinition } from '../../types';

export const calendarheroTechnologyDefinition = {
	id: "calendarhero",
	name: "CalendarHero",
	website: "https://calendarhero.com",
	description: "CalendarHero (formerly Zoom.ai) is meeting scheduling software that helps you book meetings automatically.",
	icon: "CalendarHero.png",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "calendarhero:jsGlobal:0",
			kind: "jsGlobal",
			property: "ZOOMAI.VARS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "calendarhero:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.calendarhero\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "calendarhero:dom:2",
			kind: "dom",
			selector: "iframe[src*='.calendarhero.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
