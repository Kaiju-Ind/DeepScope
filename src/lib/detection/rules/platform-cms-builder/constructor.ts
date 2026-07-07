import type { TechnologyDefinition } from '../../types';

export const constructorTechnologyDefinition = {
	id: "constructor",
	name: "Constructor",
	website: "https://constructor.io",
	description: "Constructor is an ecommerce tool optimizing site search and product discovery, leveraging AI, NLP, data, and personalization to enhance user experiences and meet KPIs.",
	icon: "ConstructorIO.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "constructor:jsGlobal:0",
			kind: "jsGlobal",
			property: "ConstructorioAutocomplete",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "constructor:jsGlobal:1",
			kind: "jsGlobal",
			property: "ConstructorioClient",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "constructor:jsGlobal:2",
			kind: "jsGlobal",
			property: "ConstructorioTracker",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
