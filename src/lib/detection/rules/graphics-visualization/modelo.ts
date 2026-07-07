import type { TechnologyDefinition } from '../../types';

export const modeloTechnologyDefinition = {
	id: "modelo",
	name: "Modelo",
	website: "https://modelo.io",
	description: "Modelo is a 3D viewer and model platform that allows users to edit, share, and collaborate on digital models.",
	icon: "Modelo.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "modelo:jsGlobal:0",
			kind: "jsGlobal",
			property: "@pub/modelo-site-cmty-micros-common-dialogs",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "modelo:jsGlobal:1",
			kind: "jsGlobal",
			property: "ModeloCommonDialogs",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "modelo:meta:2",
			kind: "meta",
			key: "feBu",
			valuePattern: new RegExp("^modelo-site-cmty-home$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "modelo:meta:3",
			kind: "meta",
			key: "febu",
			valuePattern: new RegExp("^modelo-site-cmty-home$", "i"),
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
