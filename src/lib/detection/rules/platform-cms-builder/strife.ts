import type { TechnologyDefinition } from '../../types';

export const strifeTechnologyDefinition = {
	id: "strife",
	name: "Strife",
	website: "https://strife.app",
	description: "Strife is a headless CMS designed to streamline and modernize content management processes.",
	icon: "Strife.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "strife:dom:0",
			kind: "dom",
			selector: "link[href*='cdn.strife.app']",
			description: "DOM selector matches a known technology marker.",
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
