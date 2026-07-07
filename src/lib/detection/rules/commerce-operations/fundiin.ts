import type { TechnologyDefinition } from '../../types';

export const fundiinTechnologyDefinition = {
	id: "fundiin",
	name: "Fundiin",
	website: "https://fundiin.vn",
	description: "Fundiin is the BNPL leader in Vietnam in providing zero-cost buy-now-pay-later facilities.",
	icon: "Fundiin.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "fundiin:jsGlobal:0",
			kind: "jsGlobal",
			property: "websiteEnableSuggestFundiin",
			valuePattern: new RegExp("true"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fundiin:jsGlobal:1",
			kind: "jsGlobal",
			property: "websiteMaximumSuggestFundiinWithPrediction",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
