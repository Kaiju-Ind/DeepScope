import type { TechnologyDefinition } from '../../types';

export const clicksignTechnologyDefinition = {
	id: "clicksign",
	name: "Clicksign",
	website: "https://www.clicksign.com",
	description: "Clicksign is a platform offering document signing services.",
	icon: "Clicksign.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "clicksign:jsGlobal:0",
			kind: "jsGlobal",
			property: "Clicksign",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clicksign:jsGlobal:1",
			kind: "jsGlobal",
			property: "endpointClickSign",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
