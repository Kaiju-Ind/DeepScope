import type { TechnologyDefinition } from '../../types';

export const inpoweredTechnologyDefinition = {
	id: "inpowered",
	name: "inPowered",
	website: "https://inpowered.ai",
	description: "inPowered is a content amplification platform that distributes branded and editorial content across digital channels to extend reach and measure audience engagement.",
	icon: "inPowered.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "inpowered:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.inpwrd\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
