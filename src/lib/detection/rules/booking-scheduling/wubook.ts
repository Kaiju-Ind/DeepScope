import type { TechnologyDefinition } from '../../types';

export const wubookTechnologyDefinition = {
	id: "wubook",
	name: "WuBook",
	website: "https://wubook.net",
	description: "WuBook is a software platform that allows efficient management of rooms and rates for hospitality operations.",
	icon: "WuBook.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "wubook:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/wubook\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wubook:jsGlobal:1",
			kind: "jsGlobal",
			property: "_WuBook",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wubook:jsGlobal:2",
			kind: "jsGlobal",
			property: "wbWuBookUrl",
			description: "Page-owned global matches a known technology marker.",
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
