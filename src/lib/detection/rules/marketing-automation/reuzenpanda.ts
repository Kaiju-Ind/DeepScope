import type { TechnologyDefinition } from '../../types';

export const reuzenpandaTechnologyDefinition = {
	id: "reuzenpanda",
	name: "Reuzenpanda",
	website: "https://www.reuzenpanda.nl",
	description: "Tossdown is an automated software solution that generates more leads and customers without repetitive tasks.",
	icon: "Reuzenpanda.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "reuzenpanda:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.reuzenpanda\\.nl"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "reuzenpanda:jsGlobal:1",
			kind: "jsGlobal",
			property: "_reuzenpandaWidget",
			description: "Page-owned global matches a known technology marker.",
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
