import type { TechnologyDefinition } from '../../types';

export const voyadoTechnologyDefinition = {
	id: "voyado",
	name: "Voyado",
	website: "https://voyado.com",
	description: "Voyado is a marketing automation and consumer data platform that supports brand customer loyalty by enabling data-driven engagement, personalization, and lifecycle management across marketing channels.",
	icon: "Voyado.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "voyado:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.voyado\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "voyado:jsGlobal:1",
			kind: "jsGlobal",
			property: "VOYADO_GET_CART_URL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "voyado:jsGlobal:2",
			kind: "jsGlobal",
			property: "VoyadoAnalyticsObject",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
