import type { TechnologyDefinition } from '../../types';

export const publyticsTechnologyDefinition = {
	id: "publytics",
	name: "Publytics",
	website: "https://publytics.net",
	description: "Publytics is a lightweight and cookieless alternative to Google Analytics for web publishers.",
	icon: "Publytics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "publytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.publytics\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "publytics:jsGlobal:1",
			kind: "jsGlobal",
			property: "publytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
