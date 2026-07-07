import type { TechnologyDefinition } from '../../types';

export const sevenroomsTechnologyDefinition = {
	id: "sevenrooms",
	name: "SevenRooms",
	website: "https://sevenrooms.com",
	description: "SevenRooms is an fully-integrated reservation, seating and restaurant management system.",
	icon: "SevenRooms.svg",
	categories: [
		"widgets-misc",
		"booking-scheduling",
	],
	rules: [
		{
			id: "sevenrooms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sevenrooms\\.\\w+\\/widget\\/embed\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sevenrooms:dom:1",
			kind: "dom",
			selector: "iframe[src*='sevenrooms']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sevenrooms:jsGlobal:2",
			kind: "jsGlobal",
			property: "SevenroomsWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
