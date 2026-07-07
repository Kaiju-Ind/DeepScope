import type { TechnologyDefinition } from '../../types';

export const owidsTechnologyDefinition = {
	id: "owids",
	name: "Owids",
	website: "https://owids.com",
	description: "Owids is a set of widgets designed to improve website conversion rates and visitor engagement across platforms without requiring coding skills.",
	icon: "Owids.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "owids:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("sdk\\.owids\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "owids:jsGlobal:1",
			kind: "jsGlobal",
			property: "owidsSDKJSP",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "owids:header:2",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("^X-Owids-Key$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "owids:header:3",
			kind: "header",
			key: "access-control-allow-origin",
			valuePattern: new RegExp("^x-owids-key$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
