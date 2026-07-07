import type { TechnologyDefinition } from '../../types';

export const tritacKatanaCommerceTechnologyDefinition = {
	id: "tritac-katana-commerce",
	name: "Tritac Katana Commerce",
	website: "https://www.tritac.com/nl/producten/katana-commerce/",
	description: "Katana Commerce is Tritac's B2B and B2C ecommerce platform.",
	icon: "Tritac.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tritac-katana-commerce:meta:0",
			kind: "meta",
			key: "powered-by",
			valuePattern: new RegExp("^Katana\\sCommerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "tritac-katana-commerce:meta:1",
			kind: "meta",
			key: "powered-by",
			valuePattern: new RegExp("^katana\\scommerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
