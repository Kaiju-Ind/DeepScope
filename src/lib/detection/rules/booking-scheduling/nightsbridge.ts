import type { TechnologyDefinition } from '../../types';

export const nightsbridgeTechnologyDefinition = {
	id: "nightsbridge",
	name: "NightsBridge",
	website: "https://site.nightsbridge.com",
	description: "NightsBridge is a SaaS platform that provides booking and channel management tools for accommodation providers.",
	icon: "NightsBridge.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "nightsbridge:dom:0",
			kind: "dom",
			selector: "a[target='_blank'][href*='.nightsbridge.co']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "nightsbridge:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackChunkNightsbridgeBookingForm",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
