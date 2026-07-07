import type { TechnologyDefinition } from '../../types';

export const visualPortfolioTechnologyDefinition = {
	id: "visual-portfolio",
	name: "Visual Portfolio",
	website: "https://visualportfolio.co",
	description: "Visual Portfolio is a plugin with a robust set of features, designed to help you create galleries that effectively display your creative projects.",
	icon: "Visual Portfolio.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "visual-portfolio:jsGlobal:0",
			kind: "jsGlobal",
			property: "VPData.screenSizes",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "visual-portfolio:jsGlobal:1",
			kind: "jsGlobal",
			property: "VPData.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
