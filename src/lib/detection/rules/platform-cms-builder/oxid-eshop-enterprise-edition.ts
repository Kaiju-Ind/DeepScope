import type { TechnologyDefinition } from '../../types';

export const oxidEshopEnterpriseEditionTechnologyDefinition = {
	id: "oxid-eshop-enterprise-edition",
	name: "OXID eShop Enterprise Edition",
	website: "https://www.oxid-esales.com",
	description: "OXID eShop Enterprise Edition is a B2B or B2C ecommerce solution built using object oriented programming and PHP.",
	icon: "OXID eShop.svg",
	categories: [
		"platform-cms-builder",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "oxid-eshop-enterprise-edition:html:0",
			kind: "html",
			pattern: new RegExp("<!--[^-]*OXID eShop Enterprise Edition, Version (\\d+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "oxid-eshop-enterprise-edition:html:1",
			kind: "html",
			pattern: new RegExp("<!--[^-]*oxid eshop enterprise edition, version (\\d+)"),
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
