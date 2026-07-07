import type { TechnologyDefinition } from '../../types';

export const contentoTechnologyDefinition = {
	id: "contento",
	name: "Contento",
	website: "https://www.contento.io",
	description: "Contento is a headless CMS tailored to prioritize the needs of marketers.",
	icon: "Contento.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "contento:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("assets\\.contento\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
