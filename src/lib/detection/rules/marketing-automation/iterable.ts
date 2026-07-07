import type { TechnologyDefinition } from '../../types';

export const iterableTechnologyDefinition = {
	id: "iterable",
	name: "Iterable",
	website: "https://iterable.com/",
	description: "Iterable is a cross-channel marketing platform that powers unified customer experiences.",
	icon: "Iterable.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "iterable:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.iterable\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "iterable:jsGlobal:1",
			kind: "jsGlobal",
			property: "iterableAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
