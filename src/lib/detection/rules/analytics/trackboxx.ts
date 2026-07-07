import type { TechnologyDefinition } from '../../types';

export const trackboxxTechnologyDefinition = {
	id: "trackboxx",
	name: "Trackboxx",
	website: "https://trackboxx.com",
	description: "Trackboxx is a GDPR-compliant web analysis tool that operates without using cookies, providing data privacy while offering detailed website insights.",
	icon: "Trackboxx.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "trackboxx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.trackboxx\\.info"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trackboxx:jsGlobal:1",
			kind: "jsGlobal",
			property: "trackboxx",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
