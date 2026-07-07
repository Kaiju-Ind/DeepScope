import type { TechnologyDefinition } from '../../types';

export const levarTechnologyDefinition = {
	id: "levar",
	name: "Levar",
	website: "https://levar.io",
	description: "Levar specialises in 3D visualisation technology for ecommerce stores.",
	icon: "Levar.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "levar:jsGlobal:0",
			kind: "jsGlobal",
			property: "levARActivationHelper",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "levar:jsGlobal:1",
			kind: "jsGlobal",
			property: "levar.session_info",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "levar:jsGlobal:2",
			kind: "jsGlobal",
			property: "levar_onload_variant_id",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
