import type { TechnologyDefinition } from '../../types';

export const maxemailTechnologyDefinition = {
	id: "maxemail",
	name: "Maxemail",
	website: "https://maxemail.xtremepush.com",
	icon: "Maxemail.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "maxemail:jsGlobal:0",
			kind: "jsGlobal",
			property: "Mxm.Basket",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "maxemail:jsGlobal:1",
			kind: "jsGlobal",
			property: "Mxm.FormHandler",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "maxemail:jsGlobal:2",
			kind: "jsGlobal",
			property: "Mxm.Tracker",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
