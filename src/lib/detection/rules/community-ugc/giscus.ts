import type { TechnologyDefinition } from '../../types';

export const giscusTechnologyDefinition = {
	id: "giscus",
	name: "Giscus",
	website: "https://giscus.app",
	description: "Giscus is a comment system powered by GitHub Discussions.",
	icon: "Giscus.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "giscus:dom:0",
			kind: "dom",
			selector: "link[href*='giscus.app'], div[class^='giscus-container']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
