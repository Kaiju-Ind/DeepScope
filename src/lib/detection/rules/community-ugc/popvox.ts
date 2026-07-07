import type { TechnologyDefinition } from '../../types';

export const popvoxTechnologyDefinition = {
	id: "popvox",
	name: "Popvox",
	website: "https://popvox.com",
	description: "Popvox is a platform that fosters civic engagement by providing tools for citizens to influence policy decisions and engage with elected representatives on governing innovations.",
	icon: "Popvox.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "popvox:dom:0",
			kind: "dom",
			selector: "div[id*='PopVox'] > a[href*='www.popvox.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
