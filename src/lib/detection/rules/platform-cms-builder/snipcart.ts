import type { TechnologyDefinition } from '../../types';

export const snipcartTechnologyDefinition = {
	id: "snipcart",
	name: "Snipcart",
	website: "https://snipcart.com",
	description: "Snipcart is a shopping cart platform that can be integrated into any website with simple HTML and JavaScript.",
	icon: "Snipcart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "snipcart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("https:\\/\\/cdn\\.snipcart\\.com\\/themes\\/v([\\w.]+)\\/default\\/snipcart\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "snipcart:dom:1",
			kind: "dom",
			selector: "div#snipcart",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "snipcart:dom:2",
			kind: "dom",
			selector: "link[href*='snipcart.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "snipcart:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^snipcart\\-cart$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "snipcart:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.snipcart\\.com\\/themes\\/v([\\w.]+)\\/default\\/snipcart\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "snipcart:dom:5",
			kind: "dom",
			selector: "div[id^='snipcart']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "snipcart:dom:6",
			kind: "dom",
			selector: "div[id^='snipcart'], link[href*='snipcart.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
