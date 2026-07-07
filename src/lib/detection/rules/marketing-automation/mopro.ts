import type { TechnologyDefinition } from '../../types';

export const moproTechnologyDefinition = {
	id: "mopro",
	name: "Mopro",
	website: "https://www.mopro.com",
	description: "Mopro is a growth platform designed to help small businesses improve their online presence and streamline digital operations.",
	icon: "Mopro.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "mopro:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.mopro\\.com\\/"),
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
