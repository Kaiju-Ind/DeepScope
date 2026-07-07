import type { TechnologyDefinition } from '../../types';

export const avisVerifiesTechnologyDefinition = {
	id: "avis-verifies",
	name: "Avis Verifies",
	website: "https://www.netreviews.com",
	description: "Avis Verifies is a complete solution for managing your customer reviews.",
	icon: "Avis Verifies.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "avis-verifies:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.avis-verifies\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "avis-verifies:dom:1",
			kind: "dom",
			selector: "a[href*='.avis-verifies.com/'][target='_blank'], iframe[src*='.avis-verifies.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "avis-verifies:jsGlobal:2",
			kind: "jsGlobal",
			property: "avisVerifies",
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
