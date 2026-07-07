import type { TechnologyDefinition } from '../../types';

export const casasoftTechnologyDefinition = {
	id: "casasoft",
	name: "CasaSoft",
	website: "https://casasoft.ch",
	description: "CasaSoft is a provider of digital solutions tailored for real estate marketing needs.",
	icon: "CasaSoft.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "casasoft:dom:0",
			kind: "dom",
			selector: "link[href*='.casasoft.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "casasoft:jsGlobal:1",
			kind: "jsGlobal",
			property: "casawpOptionParams",
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
