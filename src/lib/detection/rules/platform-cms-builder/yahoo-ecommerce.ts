import type { TechnologyDefinition } from '../../types';

export const yahooEcommerceTechnologyDefinition = {
	id: "yahoo-ecommerce",
	name: "Yahoo! Ecommerce",
	website: "https://smallbusiness.yahoo.com/ecommerce",
	icon: "Yahoo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "yahoo-ecommerce:html:0",
			kind: "html",
			pattern: new RegExp("<link[^>]+store\\.yahoo\\.net"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "yahoo-ecommerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "YStore",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yahoo-ecommerce:header:2",
			kind: "header",
			key: "X-XRDS-Location",
			valuePattern: new RegExp("\\/ystore\\/", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "yahoo-ecommerce:dom:3",
			kind: "dom",
			selector: "link[href*='store.yahoo.net']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "yahoo-ecommerce:header:4",
			kind: "header",
			key: "x-xrds-location",
			valuePattern: new RegExp("\\/ystore\\/", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
