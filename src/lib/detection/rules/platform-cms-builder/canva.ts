import type { TechnologyDefinition } from '../../types';

export const canvaTechnologyDefinition = {
	id: "canva",
	name: "Canva",
	website: "https://www.canva.com",
	description: "Canva is an online graphic design platform that allows users to create various visual content using pre-designed templates and a library of elements.",
	icon: "Canva.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "canva:jsGlobal:0",
			kind: "jsGlobal",
			property: "canva_debounceResize",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "canva:jsGlobal:1",
			kind: "jsGlobal",
			property: "canva_scriptExecutor",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
