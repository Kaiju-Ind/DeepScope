import type { TechnologyDefinition } from '../../types';

export const rndTechnologyDefinition = {
	id: "rnd",
	name: "RND",
	website: "https://www.rnd.com.tr/en/",
	description: "RND is a software technology used for companies to set up ecommerce infrastructure.",
	icon: "RND.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rnd:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/Scripts\\/plugins\\/rnd-mobilemenu\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rnd:dom:1",
			kind: "dom",
			selector: "div#rnd-mobile-menu, a[href*='www.rnd.com.tr/?utm_source='][target='_blank'], a[href*='www.rndecommerce.com/'] > span > svg[title*='RND']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "rnd:jsGlobal:2",
			kind: "jsGlobal",
			property: "rndImgConfiguration",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rnd:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^\\.RND\\.Antiforgery$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "rnd:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^\\.RND\\.Customer$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "rnd:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^rnd_csid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "rnd:header:6",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("RND", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "rnd:meta:7",
			kind: "meta",
			key: "apple-mobile-web-app-title",
			valuePattern: new RegExp("^Rnd Commerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "rnd:meta:8",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^RND Ecommerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "rnd:dom:9",
			kind: "dom",
			selector: "div#rnd-mobile-menu, a[href*='www.rnd.com.tr/?utm_source='][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "rnd:scriptSrc:10",
			kind: "scriptSrc",
			pattern: new RegExp("\\/scripts\\/plugins\\/rnd-mobilemenu\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"recurring",
		],
	},
	requires: [
		"microsoft-asp-net",
		"new-relic",
	],
} as const satisfies TechnologyDefinition;
