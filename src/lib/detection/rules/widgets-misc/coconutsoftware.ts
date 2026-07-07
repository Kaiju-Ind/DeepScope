import type { TechnologyDefinition } from '../../types';

export const coconutsoftwareTechnologyDefinition = {
	id: "coconutsoftware",
	name: "CoconutSoftware",
	website: "https://www.coconutsoftware.com/",
	description: "Coconut is a cloud-based appointment scheduling solution designed for enterprise financial services organisations such as credit unions, retail banks and more.",
	icon: "CoconutSoftware.svg",
	categories: [
		"widgets-misc",
		"booking-scheduling",
	],
	rules: [
		{
			id: "coconutsoftware:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^coconut_calendar$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
