import type { TechnologyDefinition } from '../../types';

export const kitesTechnologyDefinition = {
	id: "kites",
	name: "Kites",
	website: "https://www.kites.io",
	description: "Kites is a no-code, drag-and-drop builder for creating interactive mobile websites.",
	icon: "Kites.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kites:jsGlobal:0",
			kind: "jsGlobal",
			property: "kiteInstance.analytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kites:jsGlobal:1",
			kind: "jsGlobal",
			property: "kiteJS",
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
