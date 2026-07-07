import type { TechnologyDefinition } from '../../types';

export const welcartTechnologyDefinition = {
	id: "welcart",
	name: "Welcart",
	website: "https://www.welcart.com",
	description: "Welcart is a free ecommerce plugin for WordPress with top market share in Japan.",
	icon: "Welcart.svg",
	categories: [
		"platform-cms-builder",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "welcart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("uscesL10n"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "welcart:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]+?href=\"[^\"]+usces_default(?:\\.min)?\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "welcart:html:2",
			kind: "html",
			pattern: new RegExp("<!-- Welcart version : v([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "welcart:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^usces_cookie$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "welcart:dom:4",
			kind: "dom",
			selector: "link[href*='usces_default.css'],link[href*='usces_default.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "welcart:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("uscesl10n"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "welcart:html:6",
			kind: "html",
			pattern: new RegExp("<!-- welcart version : v([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:welcart:welcart:*:*:*:*:*:*:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
