import type { TechnologyDefinition } from '../../types';

export const zakekeTechnologyDefinition = {
	id: "zakeke",
	name: "Zakeke",
	website: "https://www.zakeke.com",
	description: "Zakeke is a product customisation tool compatible with services and apps mostly used to manage ecommerce store.",
	icon: "Zakeke.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "zakeke:jsGlobal:0",
			kind: "jsGlobal",
			property: "zakekeBoot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zakeke:jsGlobal:1",
			kind: "jsGlobal",
			property: "zakekeCustomizeLabel",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zakeke:jsGlobal:2",
			kind: "jsGlobal",
			property: "zakekeLoading",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zakeke:jsGlobal:3",
			kind: "jsGlobal",
			property: "zakekeProductPage",
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
