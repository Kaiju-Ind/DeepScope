import type { TechnologyDefinition } from '../../types';

export const rasayelTechnologyDefinition = {
	id: "rasayel",
	name: "Rasayel",
	website: "https://www.rasayel.io",
	description: "Rasayel is a customer communication platform that helps businesses sell to and support their customers over WhatsApp and other social messaging channels.",
	icon: "Rasayel.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "rasayel:jsGlobal:0",
			kind: "jsGlobal",
			property: "RasayelOmniWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rasayel:jsGlobal:1",
			kind: "jsGlobal",
			property: "RasayelWabaWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rasayel:jsGlobal:2",
			kind: "jsGlobal",
			property: "RasayelWhatsAppWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
