import type { TechnologyDefinition } from '../../types';

export const elenoreTechnologyDefinition = {
	id: "elenore",
	name: "Elenore",
	website: "https://elenore.io",
	description: "Elenore is an all-in-one business management software platform designed to streamline operations and support business growth.",
	icon: "Elenore.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "elenore:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.elenore\\.io"),
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
