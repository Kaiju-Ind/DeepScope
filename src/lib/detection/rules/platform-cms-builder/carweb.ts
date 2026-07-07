import type { TechnologyDefinition } from '../../types';

export const carwebTechnologyDefinition = {
	id: "carweb",
	name: "CarWeb",
	website: "https://carweb.no",
	description: "CarWeb is a tailored software solution designed to support the full used car lifecycle, developed by industry professionals to address operational, management, and transactional needs within the automotive resale process.",
	icon: "CarWeb.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "carweb:jsGlobal:0",
			kind: "jsGlobal",
			property: "carWeb.imageBaseUrl",
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
