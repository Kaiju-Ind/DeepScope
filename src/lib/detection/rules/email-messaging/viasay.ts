import type { TechnologyDefinition } from '../../types';

export const viasayTechnologyDefinition = {
	id: "viasay",
	name: "ViaSay",
	website: "http://www.viasay.io",
	description: "ViaSay is a conversational AI tool that facilitates the creation of customised automated processes, enhancing the efficiency and speed of customer service.",
	icon: "ViaSay.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "viasay:jsGlobal:0",
			kind: "jsGlobal",
			property: "mindsayJsonP",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
