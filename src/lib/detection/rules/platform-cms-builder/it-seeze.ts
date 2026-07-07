import type { TechnologyDefinition } from '../../types';

export const itSeezeTechnologyDefinition = {
	id: "it-seeze",
	name: "It'seeze",
	website: "https://itseeze.com/",
	description: "It’seeze is a website design platform with a custom CMS for seamless site updates and management.",
	icon: "Itseeze.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "it-seeze:dom:0",
			kind: "dom",
			selector: "footer > div[id*='itseezeFooter']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
