import type { TechnologyDefinition } from '../../types';

export const niagahosterTechnologyDefinition = {
	id: "niagahoster",
	name: "Niagahoster",
	website: "https://niagahoster.co.id",
	description: "Niagahoster is a web hosting service for small and medium enterprises. It provides shared hosting, WordPress hosting, Virtual Private Server (VPS), and more.",
	icon: "Niagahoster.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "niagahoster:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("Niagahoster", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "niagahoster:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("niagahoster", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"niagahoster",
	],
} as const satisfies TechnologyDefinition;
