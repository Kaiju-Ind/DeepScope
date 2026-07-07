import type { TechnologyDefinition } from '../../types';

export const admoTvTechnologyDefinition = {
	id: "admo-tv",
	name: "Admo.tv",
	website: "https://www.admo.tv",
	description: "Admo.tv is a company developing a TV and radio analytics platform.",
	icon: "Admo.tv.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "admo-tv:dom:0",
			kind: "dom",
			selector: "link[href*='.admo.tv'], a[href*='.admo.tv'][target='_blank'], iframe[src*='.admo.tv/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "admo-tv:jsGlobal:1",
			kind: "jsGlobal",
			property: "ADMO_TT",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "admo-tv:jsGlobal:2",
			kind: "jsGlobal",
			property: "ADMO_config",
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
