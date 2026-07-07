import type { TechnologyDefinition } from '../../types';

export const smartstoreTechnologyDefinition = {
	id: "smartstore",
	name: "Smartstore",
	website: "https://www.smartstore.com",
	description: "Smartstore is an open-source ecommerce system with CMS capabilities.",
	icon: "Smartstore.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "smartstore:html:0",
			kind: "html",
			pattern: new RegExp("<!--Powered by Smart[sS]tore"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "smartstore:html:1",
			kind: "html",
			pattern: new RegExp("<meta property=\"sm:pagedata\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "smartstore:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^SMARTSTORE\\.CUSTOMER$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "smartstore:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^SMARTSTORE\\.VISITOR$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "smartstore:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Smart[sS]tore(.NET)? (.+)$", "i"),
			version: {
				source: "match",
				group: 2,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "smartstore:dom:5",
			kind: "dom",
			selector: "meta[property='sm:pagedata']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "smartstore:html:6",
			kind: "html",
			pattern: new RegExp("<!--powered by smart[ss]tore"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "smartstore:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^smartstore\\.customer$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "smartstore:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^smartstore\\.visitor$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "smartstore:meta:9",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^smart[ss]tore(.net)? (.+)$", "i"),
			version: {
				source: "match",
				group: 2,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:smartstore:smartstore:*:*:*:*:*:*:*:*",
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
