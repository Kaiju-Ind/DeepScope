import type { TechnologyDefinition } from '../../types';

export const importifyTechnologyDefinition = {
	id: "importify",
	name: "Importify",
	website: "https://www.importify.com/",
	description: "Importify is a dropshipping app that sources products from hundreds of suppliers, facilitating their integration into your online store for sale.",
	icon: "Importify.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "importify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.importify\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
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
