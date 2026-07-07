import type { TechnologyDefinition } from '../../types';

export const apizeeTechnologyDefinition = {
	id: "apizee",
	name: "Apizee",
	website: "https://www.apizee.com",
	description: "Apizee is a platform for easy, real-time, multi-device video interaction services.",
	icon: "Apizee.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "apizee:jsGlobal:0",
			kind: "jsGlobal",
			property: "Apizee",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "apizee:jsGlobal:1",
			kind: "jsGlobal",
			property: "apizee",
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
