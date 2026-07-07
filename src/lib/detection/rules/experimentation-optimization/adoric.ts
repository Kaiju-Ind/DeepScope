import type { TechnologyDefinition } from '../../types';

export const adoricTechnologyDefinition = {
	id: "adoric",
	name: "Adoric",
	website: "https://adoric.com",
	description: "Adoric is a lead generation tool for personalized website engagement and conversion optimisation (CRO) platform.",
	icon: "Adoric.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "adoric:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.adoric-om\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adoric:dom:1",
			kind: "dom",
			selector: "link[href*='.adoric-om.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "adoric:jsGlobal:2",
			kind: "jsGlobal",
			property: "IS_ADORIC_LOADED",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adoric:jsGlobal:3",
			kind: "jsGlobal",
			property: "__adoric__",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
