import type { TechnologyDefinition } from '../../types';

export const tooningTechnologyDefinition = {
	id: "tooning",
	name: "Tooning",
	website: "https://tooning.io",
	description: "Tooning is a digital platform that utilizes artificial intelligence to generate storyteller content.",
	icon: "Tooning.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tooning:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.tooning\\.io"),
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
