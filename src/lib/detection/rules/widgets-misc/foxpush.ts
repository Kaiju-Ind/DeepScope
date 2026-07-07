import type { TechnologyDefinition } from '../../types';

export const foxpushTechnologyDefinition = {
	id: "foxpush",
	name: "FoxPush",
	website: "https://www.foxpush.com",
	description: "FoxPush is a platform that supports pushing of notifications through the browser.",
	icon: "FoxPush.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "foxpush:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.foxpush\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "foxpush:jsGlobal:1",
			kind: "jsGlobal",
			property: "_foxpush",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
