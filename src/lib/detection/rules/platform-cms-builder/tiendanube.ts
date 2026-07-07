import type { TechnologyDefinition } from '../../types';

export const tiendanubeTechnologyDefinition = {
	id: "tiendanube",
	name: "Tiendanube",
	website: "https://www.tiendanube.com",
	description: "Tiendanube is an ecommerce platform.",
	icon: "Tiendanube.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tiendanube:jsGlobal:0",
			kind: "jsGlobal",
			property: "LS.store.url",
			valuePattern: new RegExp("^.+\\.mitiendanube\\.com$"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
