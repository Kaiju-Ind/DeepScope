import type { TechnologyDefinition } from '../../types';

export const fittingboxTechnologyDefinition = {
	id: "fittingbox",
	name: "Fittingbox",
	website: "https://www.fittingbox.com",
	description: "Fittingbox is a software provider of augmented reality and 3D solutions designed for the eyewear industry.",
	icon: "Fittingbox.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "fittingbox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.fittingbox\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fittingbox:jsGlobal:1",
			kind: "jsGlobal",
			property: "FitMix",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
