import type { TechnologyDefinition } from '../../types';

export const watiTechnologyDefinition = {
	id: "wati",
	name: "Wati",
	website: "https://www.wati.io",
	description: "Wati is a WhatsApp Business API platform facilitating multiple-agent customer support.",
	icon: "Wati.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "wati:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("wati-integration-prod-service\\.clare\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wati:jsGlobal:1",
			kind: "jsGlobal",
			property: "wati_options",
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
