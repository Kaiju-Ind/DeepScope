import type { TechnologyDefinition } from '../../types';

export const pureclarityTechnologyDefinition = {
	id: "pureclarity",
	name: "PureClarity",
	website: "https://www.pureclarity.com",
	description: "PureClarity is a platform that enables personalized upselling and delivers targeted content to increase customer engagement and sales.",
	icon: "PureClarity.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "pureclarity:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pcs\\.pureclarity\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pureclarity:jsGlobal:1",
			kind: "jsGlobal",
			property: "PureClarityObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pureclarity:jsGlobal:2",
			kind: "jsGlobal",
			property: "PureClarityType",
			description: "Page-owned global matches a known technology marker.",
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
