import type { TechnologyDefinition } from '../../types';

export const simsiteTechnologyDefinition = {
	id: "simsite",
	name: "SIMsite",
	website: "https://simgroep.nl/internet/portfolio-contentbeheer_41623/",
	icon: "SIMsite.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "simsite:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/sim(?:site|core)\\/js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
