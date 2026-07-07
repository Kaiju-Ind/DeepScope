import type { TechnologyDefinition } from '../../types';

export const salesmachineTechnologyDefinition = {
	id: "salesmachine",
	name: "Salesmachine",
	website: "https://salesmachine.io",
	description: "Salesmachine is a platform that boosts sales, enhances performance, and supports customer retention through data-driven strategies.",
	icon: "Salesmachine.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "salesmachine:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.salesmachine\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "salesmachine:jsGlobal:1",
			kind: "jsGlobal",
			property: "salesmachine",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
