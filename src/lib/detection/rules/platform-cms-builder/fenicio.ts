import type { TechnologyDefinition } from '../../types';

export const fenicioTechnologyDefinition = {
	id: "fenicio",
	name: "Fenicio",
	website: "https://fenicio.io",
	description: "Fenicio is a cloud platform that handles all aspects of ecommerce sales channel operation and management.",
	icon: "Fenicio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "fenicio:jsGlobal:0",
			kind: "jsGlobal",
			property: "_FN.validadorTelefono",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fenicio:jsGlobal:1",
			kind: "jsGlobal",
			property: "fnWishlist.cargarInfoArticulos",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fenicio:jsGlobal:2",
			kind: "jsGlobal",
			property: "fneCommerce.miCompraVisto",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
