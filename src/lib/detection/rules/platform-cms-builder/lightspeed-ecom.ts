import type { TechnologyDefinition } from '../../types';

export const lightspeedEcomTechnologyDefinition = {
	id: "lightspeed-ecom",
	name: "Lightspeed eCom",
	website: "https://www.lightspeedhq.com/products/ecommerce/",
	icon: "Lightspeed.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "lightspeed-ecom:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("http:\\/\\/assets\\.webshopapp\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lightspeed-ecom:html:1",
			kind: "html",
			pattern: new RegExp("<!-- \\[START\\] 'blocks\\/head\\.rain' -->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "lightspeed-ecom:url:2",
			kind: "url",
			pattern: new RegExp("seoshop.webshopapp.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "lightspeed-ecom:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("lightspeed\\.multisafepay\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "lightspeed-ecom:html:4",
			kind: "html",
			pattern: new RegExp("<!-- \\[start\\] 'blocks\\/head\\.rain' -->"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
		],
	},
} as const satisfies TechnologyDefinition;
