import type { TechnologyDefinition } from '../../types';

export const aeroCommerceTechnologyDefinition = {
	id: "aero-commerce",
	name: "Aero Commerce",
	website: "https://www.aerocommerce.com",
	description: "Aero Commerce is a performance-based platform designed with the evolving needs of retailers in mind.",
	icon: "Aero Commerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "aero-commerce:jsGlobal:0",
			kind: "jsGlobal",
			property: "AeroEvents.on",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aero-commerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "AeroComponents",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aero-commerce:jsGlobal:2",
			kind: "jsGlobal",
			property: "iosAEROBook",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aero-commerce:jsGlobal:3",
			kind: "jsGlobal",
			property: "iosAEROBookCalcTotal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aero-commerce:jsGlobal:4",
			kind: "jsGlobal",
			property: "iosAEROTrim",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
