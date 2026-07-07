import type { TechnologyDefinition } from '../../types';

export const perfectCorpTechnologyDefinition = {
	id: "perfect-corp",
	name: "Perfect Corp",
	website: "https://www.perfectcorp.com/business",
	description: "Perfect Corp is a beauty augmented reality company and makeup AR technology platform that develops virtual try-on solutions for cosmetics brands.",
	icon: "PerfectCorp.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "perfect-corp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("plugins-media\\.perfectcorp\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
