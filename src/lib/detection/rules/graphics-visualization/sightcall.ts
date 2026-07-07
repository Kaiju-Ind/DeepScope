import type { TechnologyDefinition } from '../../types';

export const sightcallTechnologyDefinition = {
	id: "sightcall",
	name: "SightCall",
	website: "https://sightcall.com",
	description: "SightCall is a platform that provides real-time AR and AI-powered guidance to help service teams resolve issues quicker.",
	icon: "SightCall.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "sightcall:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sightcall\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sightcall:jsGlobal:1",
			kind: "jsGlobal",
			property: "SightcallConsole",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
