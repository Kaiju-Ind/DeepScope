import type { TechnologyDefinition } from '../../types';

export const bloomTechnologyDefinition = {
	id: "bloom",
	name: "Bloom",
	website: "https://bloom.wine/",
	description: "Bloom is a provider of commerce services for the alcohol industry.",
	icon: "BloomWine.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bloom:jsGlobal:0",
			kind: "jsGlobal",
			property: "Bloom.Cookie",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bloom:jsGlobal:1",
			kind: "jsGlobal",
			property: "BloomController",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
