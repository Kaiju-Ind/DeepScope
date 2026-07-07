import type { TechnologyDefinition } from '../../types';

export const shopsysTechnologyDefinition = {
	id: "shopsys",
	name: "Shopsys",
	website: "https://www.shopsys.com/shopsys-platform",
	description: "Shopsys is an open-code ecommerce platform for building large custom online shops, offering extensive customization.",
	icon: "Shopsys.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopsys:meta:0",
			kind: "meta",
			key: "Author",
			valuePattern: new RegExp("^ShopSys.cz", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "shopsys:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^shopsys.cz", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
