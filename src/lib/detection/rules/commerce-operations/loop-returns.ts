import type { TechnologyDefinition } from '../../types';

export const loopReturnsTechnologyDefinition = {
	id: "loop-returns",
	name: "Loop Returns",
	website: "https://www.loopreturns.com",
	description: "Loop Returns is a return portal that automated all the returns and refunds of products.",
	icon: "Loop.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "loop-returns:dom:0",
			kind: "dom",
			selector: "a[href*='.loopreturns.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "loop-returns:jsGlobal:1",
			kind: "jsGlobal",
			property: "Loop.config.variantParam",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "loop-returns:jsGlobal:2",
			kind: "jsGlobal",
			property: "LoopOnstore",
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
