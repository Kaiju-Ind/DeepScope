import type { TechnologyDefinition } from '../../types';

export const deleraTechnologyDefinition = {
	id: "delera",
	name: "Delera",
	website: "https://delera.io",
	description: "Delera is a platform that helps increase turnover by managing and automating marketing and sales processes.",
	icon: "Delera.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "delera:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.delera\\.io"),
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
