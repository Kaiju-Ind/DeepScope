import type { TechnologyDefinition } from '../../types';

export const tokyTechnologyDefinition = {
	id: "toky",
	name: "Toky",
	website: "https://toky.co",
	description: "Toky is a phone system that integrates across devices, enabling calls and messages through phone, app, or desktop.",
	icon: "Toky.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "toky:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.toky\\.co\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "toky:jsGlobal:1",
			kind: "jsGlobal",
			property: "TokyBase64",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "toky:jsGlobal:2",
			kind: "jsGlobal",
			property: "TokyBusiness",
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
