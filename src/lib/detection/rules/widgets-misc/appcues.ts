import type { TechnologyDefinition } from '../../types';

export const appcuesTechnologyDefinition = {
	id: "appcues",
	name: "Appcues",
	website: "https://www.appcues.com/",
	description: "Appcues is a solution for measuring and improving product adoption.",
	icon: "Appcues.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "appcues:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("fast\\.appcues\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "appcues:jsGlobal:1",
			kind: "jsGlobal",
			property: "Appcues",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
