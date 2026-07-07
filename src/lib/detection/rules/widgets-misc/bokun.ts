import type { TechnologyDefinition } from '../../types';

export const bokunTechnologyDefinition = {
	id: "bokun",
	name: "Bokun",
	website: "https://www.bokun.io",
	description: "Bokun is a cloud-based booking management solution which enables small to large travel and tourism businesses manage reservations, products content, images, categorisation, pricing, inventory, and payments.",
	icon: "Bokun.svg",
	categories: [
		"widgets-misc",
		"booking-scheduling",
	],
	rules: [
		{
			id: "bokun:jsGlobal:0",
			kind: "jsGlobal",
			property: "BokunWidgetEmbedder",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bokun:jsGlobal:1",
			kind: "jsGlobal",
			property: "__bokunWidgets",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bokun:jsGlobal:2",
			kind: "jsGlobal",
			property: "bokunBookingChannelUUID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bokun:jsGlobal:3",
			kind: "jsGlobal",
			property: "bokunSessionId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bokun:jsGlobal:4",
			kind: "jsGlobal",
			property: "BokunWidgets",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bokun:jsGlobal:5",
			kind: "jsGlobal",
			property: "__BokunWidgetsLoader",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bokun:jsGlobal:6",
			kind: "jsGlobal",
			property: "bokunPolyfillReady",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
