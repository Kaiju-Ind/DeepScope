import type { TechnologyDefinition } from '../../types';

export const crowdinTechnologyDefinition = {
	id: "crowdin",
	name: "Crowdin",
	website: "https://crowdin.com",
	description: "Crowdin is a localization management platform that streamlines the process of translating, organizing, and maintaining multilingual content for software, websites, and other digital products.",
	icon: "Crowdin.svg",
	categories: [
		"translations",
	],
	rules: [
		{
			id: "crowdin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.app\\.crowdin\\.net"),
			description: "Script source URL matches a known technology marker.",
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
