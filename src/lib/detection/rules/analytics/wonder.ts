import type { TechnologyDefinition } from '../../types';

export const wonderTechnologyDefinition = {
	id: "wonder",
	name: "Wonder",
	website: "https://www.wonder-ma.com",
	description: "Wonder is an analytics and marketing tool that uses offline and online data to implement optimal marketing strategies aimed at achieving website goals, such as conversions.",
	icon: "Wonder.svg",
	categories: [
		"analytics",
		"marketing-automation",
	],
	rules: [
		{
			id: "wonder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.wonder-ma\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wonder:jsGlobal:1",
			kind: "jsGlobal",
			property: "vmwondertracking",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
