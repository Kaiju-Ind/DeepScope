import type { TechnologyDefinition } from '../../types';

export const ifdoTechnologyDefinition = {
	id: "ifdo",
	name: "Ifdo",
	website: "https://ifdo.co.kr/",
	description: "Ifdo is a marketing and segmentation tool.",
	icon: "Ifdo.svg",
	categories: [
		"marketing-automation",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "ifdo:jsGlobal:0",
			kind: "jsGlobal",
			property: "_NBIFDOBODYINNERHTML",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ifdo:jsGlobal:1",
			kind: "jsGlobal",
			property: "_NBIFDOHEADCSSFILE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ifdo:jsGlobal:2",
			kind: "jsGlobal",
			property: "_NBIFDOHEADINNERHTML",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
