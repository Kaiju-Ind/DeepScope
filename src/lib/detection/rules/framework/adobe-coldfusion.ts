import type { TechnologyDefinition } from '../../types';

export const adobeColdfusionTechnologyDefinition = {
	id: "adobe-coldfusion",
	name: "Adobe ColdFusion",
	website: "https://adobe.com/products/coldfusion-family.html",
	description: "Adobe ColdFusion is a server-side scripting platform for building web applications and APIs, using a language called CFML (ColdFusion Markup Language).",
	icon: "Adobe ColdFusion.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "adobe-coldfusion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/cfajax\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adobe-coldfusion:html:1",
			kind: "html",
			pattern: new RegExp("<!-- START headerTags\\.cfm"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "adobe-coldfusion:url:2",
			kind: "url",
			pattern: new RegExp("\\.cfm(?:$|\\?)"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "adobe-coldfusion:jsGlobal:3",
			kind: "jsGlobal",
			property: "_cfEmails",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adobe-coldfusion:header:4",
			kind: "header",
			key: "Cookie",
			valuePattern: new RegExp("CFTOKEN=", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "adobe-coldfusion:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^CFID\\|CFTOKEN\\|CFMAGIC\\|CFGLOBALS$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "adobe-coldfusion:html:6",
			kind: "html",
			pattern: new RegExp("<!-- start headertags\\.cfm"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "adobe-coldfusion:header:7",
			kind: "header",
			key: "cookie",
			valuePattern: new RegExp("cftoken=", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "adobe-coldfusion:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^CFGLOBALS$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:adobe:coldfusion:*:*:*:*:*:*:*:*",
	},
	implies: [
		"cfml",
	],
} as const satisfies TechnologyDefinition;
