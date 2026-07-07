import type { TechnologyDefinition } from '../../types';

export const excelImpactTechnologyDefinition = {
	id: "excel-impact",
	name: "Excel Impact",
	website: "https://excelimpact.com",
	description: "Excel Impact is a provider of lead generation systems and advertiser solutions.",
	icon: "ExcelImpact.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "excel-impact:dom:0",
			kind: "dom",
			selector: "link[href*='api.excelimpact.com'][rel='preconnect']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
