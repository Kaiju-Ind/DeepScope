import type { TechnologyDefinition } from '../../types';

export const worldzTechnologyDefinition = {
	id: "worldz",
	name: "Worldz",
	website: "https://www.worldz-business.net",
	description: "Worldz calculates the economic value of a user’s social popularity (qualitatively and quantitatively). In proportion to this value, it provides a personalised discount, which can be applied in exchange for a social sharing by the user on their Instagram or Facebook profile.",
	icon: "Worldz.png",
	categories: [
		"widgets-misc",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "worldz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.worldztool\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
