import type { TechnologyDefinition } from '../../types';

export const nidoTecnologiaTechnologyDefinition = {
	id: "nido-tecnologia",
	name: "Nido Tecnologia",
	website: "https://www.nido.com.br",
	description: "Nido Tecnologia is a platform that provides software solutions for the real estate industry in Brazil.",
	icon: "NidoTecnologia.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "nido-tecnologia:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.nidoimovel\\.com\\.br"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "nido-tecnologia:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Nido Tecnologia$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "nido-tecnologia:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^nido tecnologia$", "i"),
			description: "Meta tag matches a known technology marker.",
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
