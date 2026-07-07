import type { TechnologyDefinition } from '../../types';

export const toonimoTechnologyDefinition = {
	id: "toonimo",
	name: "Toonimo",
	website: "https://www.toonimo.com",
	description: "Toonimo is a cloud-based platform that enables businesses to showcase key website features and guide site visitors.",
	icon: "Toonimo.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "toonimo:jsGlobal:0",
			kind: "jsGlobal",
			property: "TMO_jsFetchTimeStart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "toonimo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Toonimo.Analytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "toonimo:jsGlobal:2",
			kind: "jsGlobal",
			property: "ToonimoLoader",
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
