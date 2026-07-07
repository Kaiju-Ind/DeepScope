import type { TechnologyDefinition } from '../../types';

export const cookieyesTechnologyDefinition = {
	id: "cookieyes",
	name: "CookieYes",
	website: "https://www.cookieyes.com/",
	description: "CookieYes is a cookie consent and compliance platform for websites.",
	icon: "cookieyes.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "cookieyes:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.cookieyes\\.com\\/client_data\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cookieyes:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn-cookieyes\\.com\\/client_data\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cookieyes:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/cookie-law-info\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cookieyes:dom:3",
			kind: "dom",
			selector: "#cookie-law-info-bar",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cookieyes:dom:4",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/cookie-law-info/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cookieyes:jsGlobal:5",
			kind: "jsGlobal",
			property: "cookieYes",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
