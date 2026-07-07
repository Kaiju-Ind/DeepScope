import type { TechnologyDefinition } from '../../types';

export const vendreTechnologyDefinition = {
	id: "vendre",
	name: "Vendre",
	website: "https://vendre.io",
	description: "Vendre is a module-based ecommerce system where you choose which functions your organisation needs.",
	icon: "Vendre.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vendre:jsGlobal:0",
			kind: "jsGlobal",
			property: "VendreMap.maps_loaded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vendre:jsGlobal:1",
			kind: "jsGlobal",
			property: "vendre_config",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
