import type { TechnologyDefinition } from '../../types';

export const recopTechnologyDefinition = {
	id: "recop",
	name: "Recop",
	website: "https://recop.jp",
	description: "Recop is a recruitment optimization system from Japan.",
	icon: "Recop.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "recop:jsGlobal:0",
			kind: "jsGlobal",
			property: "$recop.Event",
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
