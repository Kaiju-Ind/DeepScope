import type { TechnologyDefinition } from '../../types';

export const evehoTechnologyDefinition = {
	id: "eveho",
	name: "Eveho",
	website: "https://eveho.io",
	description: "Eveho is a platform that enables the creation of digital dealerships by providing tools to set up and manage online vehicle sales.",
	icon: "Eveho.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "eveho:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.eveho\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
