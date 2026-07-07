import type { TechnologyDefinition } from '../../types';

export const widenTechnologyDefinition = {
	id: "widen",
	name: "Widen",
	website: "https://www.widen.com",
	description: "Widen is a digital asset management and product information management solutions provider.",
	icon: "Widen.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "widen:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\/\\d+-\\d+\\/stack\\/en\\/widenjs\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "widen:jsGlobal:1",
			kind: "jsGlobal",
			property: "WidenSessionTimer",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "widen:jsGlobal:2",
			kind: "jsGlobal",
			property: "WidenUI",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
