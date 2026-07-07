import type { TechnologyDefinition } from '../../types';

export const mytimeTechnologyDefinition = {
	id: "mytime",
	name: "MyTime",
	website: "https://mytime.com",
	description: "MyTime is a scheduling and customer engagement platform that streamlines appointment management and client interactions for businesses.",
	icon: "MyTime.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "mytime:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.mytime\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mytime:jsGlobal:1",
			kind: "jsGlobal",
			property: "myTimeWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
