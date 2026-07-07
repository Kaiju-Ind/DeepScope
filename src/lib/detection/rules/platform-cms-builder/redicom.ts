import type { TechnologyDefinition } from '../../types';

export const redicomTechnologyDefinition = {
	id: "redicom",
	name: "Redicom",
	website: "https://www.redicom.pt",
	description: "Redicom is a Portuguese-based platform specializing in premium ecommerce solutions.",
	icon: "Redicom.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "redicom:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Redicom Prolepse$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "redicom:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^redicom prolepse$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
