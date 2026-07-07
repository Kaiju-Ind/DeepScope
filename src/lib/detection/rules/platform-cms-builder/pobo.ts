import type { TechnologyDefinition } from '../../types';

export const poboTechnologyDefinition = {
	id: "pobo",
	name: "Pobo",
	website: "https://www.pobo.cz",
	description: "Pobo is a platform for building and customizing web pages with drag-and-drop functionality and design tools.",
	icon: "Pobo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pobo:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.pobo\\.cz"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
