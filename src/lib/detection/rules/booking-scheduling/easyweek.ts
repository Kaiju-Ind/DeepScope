import type { TechnologyDefinition } from '../../types';

export const easyweekTechnologyDefinition = {
	id: "easyweek",
	name: "EasyWeek",
	website: "https://easyweek.io",
	description: "EasyWeek is a software platform that enables appointment scheduling for businesses across various industries.",
	icon: "EasyWeek.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "easyweek:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.easyweek\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "easyweek:jsGlobal:1",
			kind: "jsGlobal",
			property: "EasyWeekWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
