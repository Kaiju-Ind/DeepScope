import type { TechnologyDefinition } from '../../types';

export const customilyTechnologyDefinition = {
	id: "customily",
	name: "Customily",
	website: "https://www.customily.com",
	description: "Customily is an online product personalisation software.",
	icon: "Customily.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "customily:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:cdn|app)\\.customily\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "customily:jsGlobal:1",
			kind: "jsGlobal",
			property: "customily.sticky",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
