import type { TechnologyDefinition } from '../../types';

export const plentyshopLtsTechnologyDefinition = {
	id: "plentyshop-lts",
	name: "plentyShop LTS",
	website: "https://www.plentymarkets.com/product/modules/online-shop/",
	description: "The official template plugin developed by plentymarkets. plentyShop LTS is the default template for plentymarkets online stores.",
	icon: "plentyShop LTS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "plentyshop-lts:header:0",
			kind: "header",
			key: "X-Plenty-Shop",
			valuePattern: new RegExp("Ceres", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "plentyshop-lts:header:1",
			kind: "header",
			key: "x-plenty-shop",
			valuePattern: new RegExp("ceres", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
