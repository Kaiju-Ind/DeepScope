import type { TechnologyDefinition } from '../../types';

export const shoptetTechnologyDefinition = {
	id: "shoptet",
	name: "Shoptet",
	website: "https://www.shoptet.cz",
	description: "Shoptet is an ecommerce solutions from store builder, inventory management of online payments.",
	icon: "Shoptet.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shoptet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/cdn\\.myshoptet\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shoptet:html:1",
			kind: "html",
			pattern: new RegExp("<link [^>]*href=\"https?:\\/\\/cdn\\.myshoptet\\.com\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "shoptet:jsGlobal:2",
			kind: "jsGlobal",
			property: "shoptet",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shoptet:meta:3",
			kind: "meta",
			key: "web_author",
			valuePattern: new RegExp("^Shoptet", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "shoptet:dom:4",
			kind: "dom",
			selector: "link[href*='cdn.myshoptet.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "shoptet:meta:5",
			kind: "meta",
			key: "web_author",
			valuePattern: new RegExp("^shoptet", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
