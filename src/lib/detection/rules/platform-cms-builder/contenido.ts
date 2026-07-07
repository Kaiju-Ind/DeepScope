import type { TechnologyDefinition } from '../../types';

export const contenidoTechnologyDefinition = {
	id: "contenido",
	name: "Contenido",
	website: "https://contenido.org/en",
	description: "Contenido is a robust content management system (CMS) tailored for efficient creation and administration of digital content across websites and online projects.",
	icon: "Contenido.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "contenido:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Contenido ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "contenido:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("contenido ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:contenido:contendio:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
