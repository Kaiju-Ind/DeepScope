import type { TechnologyDefinition } from '../../types';

export const oxidEshopCommunityEditionTechnologyDefinition = {
	id: "oxid-eshop-community-edition",
	name: "OXID eShop Community Edition",
	website: "https://www.oxid-esales.com",
	description: "OXID eShop Community Edition is a free, open source ecommerce solution built using object oriented programming and PHP.",
	icon: "OXID eShop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "oxid-eshop-community-edition:html:0",
			kind: "html",
			pattern: new RegExp("<!--[^-]*OXID eShop Community Edition, Version (\\d+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "oxid-eshop-community-edition:html:1",
			kind: "html",
			pattern: new RegExp("<!--[^-]*oxid eshop community edition, version (\\d+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"php",
	],
	excludes: [
		"oxid-eshop",
	],
} as const satisfies TechnologyDefinition;
