import type { TechnologyDefinition } from '../../types';

export const tiendanaTechnologyDefinition = {
	id: "tiendana",
	name: "Tiendana",
	website: "https://www.tiendana.com",
	description: "Tiendana is a SaaS platform that enables businesses to sell through point-of-sale terminals, an online store, and self-service kiosks.",
	icon: "Tiendana.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tiendana:jsGlobal:0",
			kind: "jsGlobal",
			property: "tiendana.appendStoreParam",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tiendana:header:1",
			kind: "header",
			key: "Custom-Server",
			valuePattern: new RegExp("^Tiendana$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
