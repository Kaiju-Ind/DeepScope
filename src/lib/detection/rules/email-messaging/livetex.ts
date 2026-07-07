import type { TechnologyDefinition } from '../../types';

export const livetexTechnologyDefinition = {
	id: "livetex",
	name: "LiveTex",
	website: "https://livetex.ru",
	description: "LiveTex is a universal chat platform that provides digital communication solutions, allowing businesses to interact with clients across various digital channels.",
	icon: "LiveTex.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "livetex:jsGlobal:0",
			kind: "jsGlobal",
			property: "liveTex",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "livetex:jsGlobal:1",
			kind: "jsGlobal",
			property: "liveTexID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "livetex:jsGlobal:2",
			kind: "jsGlobal",
			property: "liveTex_object",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
