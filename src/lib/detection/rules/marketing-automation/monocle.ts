import type { TechnologyDefinition } from '../../types';

export const monocleTechnologyDefinition = {
	id: "monocle",
	name: "Monocle",
	website: "https://www.usemonocle.com",
	description: "Monocle is an AI-powered platform that optimizes incentives to boost profits while maintaining brand equity and margins.",
	icon: "Monocle.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "monocle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.usemonocle\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "monocle:jsGlobal:1",
			kind: "jsGlobal",
			property: "monocle.config",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "monocle:jsGlobal:2",
			kind: "jsGlobal",
			property: "monocle_popup_id_variants",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
