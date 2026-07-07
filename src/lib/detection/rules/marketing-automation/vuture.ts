import type { TechnologyDefinition } from '../../types';

export const vutureTechnologyDefinition = {
	id: "vuture",
	name: "Vuture",
	website: "https://vutu.re",
	description: "Vuture is an all-in-one global technology platform that provides marketing solutions.",
	icon: "Vuture.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "vuture:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.vuture\\.net\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
