import type { TechnologyDefinition } from '../../types';

export const findmeashoeTechnologyDefinition = {
	id: "findmeashoe",
	name: "Findmeashoe",
	website: "https://findmeashoe.com",
	description: "Findmeashoe is a footwear recommendation portal that aims to improve shopping efficiency and experience of footwear shoppers.",
	icon: "Findmeashoe.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "findmeashoe:jsGlobal:0",
			kind: "jsGlobal",
			property: "FmasJavaScript",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "findmeashoe:jsGlobal:1",
			kind: "jsGlobal",
			property: "fmasGenderSizeTextVariantIdCollection",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "findmeashoe:jsGlobal:2",
			kind: "jsGlobal",
			property: "fmasUniversalWidgetJsFileName",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
