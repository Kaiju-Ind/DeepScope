import type { TechnologyDefinition } from '../../types';

export const podioTechnologyDefinition = {
	id: "podio",
	name: "Podio",
	website: "https://www.podio.com",
	description: "Podio is a customizable social work platform for collaboration with co-workers and clients, enabling task management and communication.",
	icon: "Podio.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "podio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/podio\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "podio:jsGlobal:1",
			kind: "jsGlobal",
			property: "_podioWebForm",
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
