import type { TechnologyDefinition } from '../../types';

export const tonedenTechnologyDefinition = {
	id: "toneden",
	name: "ToneDen",
	website: "https://www.toneden.io",
	description: "ToneDen is a social marketing platform designed to help businesses reach and sell to targeted audiences.",
	icon: "ToneDen.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "toneden:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.toneden\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
