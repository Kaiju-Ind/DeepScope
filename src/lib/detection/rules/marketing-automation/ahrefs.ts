import type { TechnologyDefinition } from '../../types';

export const ahrefsTechnologyDefinition = {
	id: "ahrefs",
	name: "Ahrefs",
	website: "https://ahrefs.com",
	description: "Ahrefs is an online toolset utilised for search engine optimisation (SEO) and competitor analysis, which permits users to analyse their website's performance, track keyword rankings, identify backlink opportunities, and research competitors' websites, among other features.",
	icon: "ahrefs.svg",
	categories: [
		"marketing-automation",
		"analytics",
	],
	rules: [],
	metadata: {
		pricing: [
			"low",
			"mid",
		],
	},
} as const satisfies TechnologyDefinition;
