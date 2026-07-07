import type { TechnologyDefinition } from '../../types';

export const acquireCobrowseTechnologyDefinition = {
	id: "acquire-cobrowse",
	name: "Acquire Cobrowse",
	website: "https://acquire.io/co-browsing",
	description: "Acquire Cobrowse is a safe and secure method of interacting with a customer's browser without downloading any additional software.",
	icon: "Acquire.svg",
	categories: [
		"widgets-misc",
		"media-video",
	],
	rules: [
		{
			id: "acquire-cobrowse:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.acquire\\.io\\/cobrowse\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "acquire-cobrowse:jsGlobal:1",
			kind: "jsGlobal",
			property: "acquireCobrowseRTC",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "acquire-cobrowse:jsGlobal:2",
			kind: "jsGlobal",
			property: "acquireCobrowseSettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "acquire-cobrowse:jsGlobal:3",
			kind: "jsGlobal",
			property: "acquireConfigNodeServer",
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
