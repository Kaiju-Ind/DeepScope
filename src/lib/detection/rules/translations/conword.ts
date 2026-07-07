import type { TechnologyDefinition } from '../../types';

export const conwordTechnologyDefinition = {
	id: "conword",
	name: "Conword",
	website: "https://conword.io",
	description: "Conword is a platform that provides automatic translations for websites, enabling multilingual content delivery without manual intervention.",
	icon: "Conword.svg",
	categories: [
		"translations",
	],
	rules: [
		{
			id: "conword:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.conword\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
