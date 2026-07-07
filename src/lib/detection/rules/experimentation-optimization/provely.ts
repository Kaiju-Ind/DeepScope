import type { TechnologyDefinition } from '../../types';

export const provelyTechnologyDefinition = {
	id: "provely",
	name: "Provely",
	website: "https://provely.io",
	description: "Provely is a conversion software that displays verified social proof on webpages to help online businesses increase leads, signups, and sales.",
	icon: "Provely.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "provely:jsGlobal:0",
			kind: "jsGlobal",
			property: "provely.bindFields",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "provely:jsGlobal:1",
			kind: "jsGlobal",
			property: "provelys",
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
