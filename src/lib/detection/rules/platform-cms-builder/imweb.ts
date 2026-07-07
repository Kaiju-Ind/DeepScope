import type { TechnologyDefinition } from '../../types';

export const imwebTechnologyDefinition = {
	id: "imweb",
	name: "Imweb",
	website: "https://imweb.me",
	description: "Imweb is an ecommerce website builder software.",
	icon: "Imweb.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "imweb:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("vendor-cdn\\.imweb\\.me\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "imweb:jsGlobal:1",
			kind: "jsGlobal",
			property: "IMWEB_TEMPLATE",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
