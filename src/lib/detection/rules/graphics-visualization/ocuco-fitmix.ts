import type { TechnologyDefinition } from '../../types';

export const ocucoFitmixTechnologyDefinition = {
	id: "ocuco-fitmix",
	name: "Ocuco FitMix",
	website: "https://www.ocuco.com/fitmix",
	description: "Ocuco is now offering its customers FittingBox's FitMix, a virtual frame try-on tool.",
	icon: "Ocuco.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "ocuco-fitmix:jsGlobal:0",
			kind: "jsGlobal",
			property: "FitMix.WIDGET_BASE_URL",
			valuePattern: new RegExp("static\\.fittingbox\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
