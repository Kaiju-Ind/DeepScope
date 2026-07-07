import type { TechnologyDefinition } from '../../types';

export const zapnitoTechnologyDefinition = {
	id: "zapnito",
	name: "Zapnito",
	website: "https://zapnito.com",
	description: "Zapnito is a platform that enables B2B organizations to manage and scale digital engagement, education, and community-driven growth through integrated content and experience tools.",
	icon: "Zapnito.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "zapnito:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.zapnito\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "zapnito:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackChunkzapnito_web",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zapnito:jsGlobal:2",
			kind: "jsGlobal",
			property: "zapnito.abilities",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
