import type { TechnologyDefinition } from '../../types';

export const canyonTechnologyDefinition = {
	id: "canyon",
	name: "Canyon",
	website: "https://docs.canyonjs.io",
	description: "Canyon is a tool that enables JavaScript coverage collection and real-time report generation through Babel configuration, addressing coverage-gathering challenges in end-to-end testing.",
	icon: "Canyon.svg",
	categories: [
		"transpiler",
		"developer-tooling",
	],
	rules: [
		{
			id: "canyon:jsGlobal:0",
			kind: "jsGlobal",
			property: "__coverage__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "canyon:jsGlobal:1",
			kind: "jsGlobal",
			property: "canyonShowDecorations",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
