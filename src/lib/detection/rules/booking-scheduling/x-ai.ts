import type { TechnologyDefinition } from '../../types';

export const xAiTechnologyDefinition = {
	id: "x-ai",
	name: "X.ai",
	website: "https://x.ai",
	description: "X.ai is a scheduling tool that organizes meeting times and improves lead conversion by adding embedded booking buttons to websites or within live chat applications.",
	icon: "X.ai.png",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "x-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:cdn)?x\\.ai\\/.*\\/xdotai-embed\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "x-ai:jsGlobal:1",
			kind: "jsGlobal",
			property: "xdotaiAction",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "x-ai:jsGlobal:2",
			kind: "jsGlobal",
			property: "xdotaiButton",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
