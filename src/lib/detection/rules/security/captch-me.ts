import type { TechnologyDefinition } from '../../types';

export const captchMeTechnologyDefinition = {
	id: "captch-me",
	name: "Captch Me",
	website: "https://captchme.com",
	icon: "Captch Me.svg",
	categories: [
		"security",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "captch-me:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/api\\.captchme\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "captch-me:jsGlobal:1",
			kind: "jsGlobal",
			property: "Captchme",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
