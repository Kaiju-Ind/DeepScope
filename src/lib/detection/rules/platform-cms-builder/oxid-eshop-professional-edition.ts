import type { TechnologyDefinition } from '../../types';

export const oxidEshopProfessionalEditionTechnologyDefinition = {
	id: "oxid-eshop-professional-edition",
	name: "OXID eShop Professional Edition",
	website: "https://exchange.oxid-esales.com/OXID-Products/OXID-eShop/OXID-eShop-Professional-Edition-6-Professional-Edition-6-Stable-PE-6-0-x.html",
	description: "OXID eShop Professional Edition is an e-ommerce platform for both small start-up companies and experience online retailers with a wide range of functions, software maintenance and support.",
	icon: "OXID eShop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "oxid-eshop-professional-edition:html:0",
			kind: "html",
			pattern: new RegExp("<!--[^-]*OXID eShop Professional Edition, Version (\\d+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "oxid-eshop-professional-edition:html:1",
			kind: "html",
			pattern: new RegExp("<!--[^-]*oxid eshop professional edition, version (\\d+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		pricing: [
			"high",
			"onetime",
		],
	},
	implies: [
		"php",
	],
	excludes: [
		"oxid-eshop",
	],
} as const satisfies TechnologyDefinition;
