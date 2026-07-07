import type { TechnologyDefinition } from '../../types';

export const creaitorTechnologyDefinition = {
	id: "creaitor",
	name: "Creaitor",
	website: "https://www.creaitor.ai",
	description: "Creaitor is an AI-driven platform that offers tools for content creation and SEO optimization to help content producers enhance their online presence.",
	icon: "Creaitor.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "creaitor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.creaitor\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
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
