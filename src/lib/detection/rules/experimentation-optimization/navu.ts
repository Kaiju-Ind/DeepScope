import type { TechnologyDefinition } from '../../types';

export const navuTechnologyDefinition = {
	id: "navu",
	name: "Navu",
	website: "https://navu.co",
	description: "Navu is a platform that uses AI to enhance B2B websites by delivering targeted messages to visitors, helping improve lead conversion through personalized user engagement.",
	icon: "Navu.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "navu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("c\\.navu\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "navu:jsGlobal:1",
			kind: "jsGlobal",
			property: "$_navuEmbedded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "navu:jsGlobal:2",
			kind: "jsGlobal",
			property: "$navuContext",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
