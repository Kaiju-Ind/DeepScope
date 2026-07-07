import type { TechnologyDefinition } from '../../types';

export const omniconvertTechnologyDefinition = {
	id: "omniconvert",
	name: "Omniconvert",
	website: "https://www.omniconvert.com",
	description: "Omniconvert is an award-winning conversion rate optimisation (CRO) software that can be used for A/B testing, online surveys, traffic segmentation.",
	icon: "Omniconvert.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "omniconvert:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.omniconvert\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "omniconvert:dom:1",
			kind: "dom",
			selector: "link[href*='app.omniconvert.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "omniconvert:jsGlobal:2",
			kind: "jsGlobal",
			property: "_omni",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
