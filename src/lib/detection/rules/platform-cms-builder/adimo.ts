import type { TechnologyDefinition } from '../../types';

export const adimoTechnologyDefinition = {
	id: "adimo",
	name: "Adimo",
	website: "https://www.adimo.co",
	description: "Adimo is a platform that integrates content with commerce, enabling CPG brands to create a seamless ecommerce experience.",
	icon: "Adimo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "adimo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.adimo\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adimo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Adimo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
