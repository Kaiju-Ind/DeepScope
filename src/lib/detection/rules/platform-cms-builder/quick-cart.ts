import type { TechnologyDefinition } from '../../types';

export const quickCartTechnologyDefinition = {
	id: "quick-cart",
	name: "Quick.Cart",
	website: "https://opensolution.org",
	icon: "Quick.Cart.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "quick-cart:html:0",
			kind: "html",
			pattern: new RegExp("<a href=\"[^>]+opensolution\\.org\\/\">(?:Shopping cart by|Sklep internetowy)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "quick-cart:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Quick\\.Cart(?: v([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "quick-cart:html:2",
			kind: "html",
			pattern: new RegExp("<a href=\"[^>]+opensolution\\.org\\/\">(?:shopping cart by|sklep internetowy)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "quick-cart:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("quick\\.cart(?: v([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:opensolution:quick_cart:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
