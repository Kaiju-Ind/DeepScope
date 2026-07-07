import type { TechnologyDefinition } from '../../types';

export const kenticoCmsTechnologyDefinition = {
	id: "kentico-cms",
	name: "Kentico CMS",
	website: "https://www.kentico.com",
	description: "Kentico CMS is a web content management system for building websites, online stores, intranets, and Web 2.0 community sites.",
	icon: "Kentico CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kentico-cms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/CMSPages\\/GetResource\\.ashx"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kentico-cms:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/kentico\\.resource"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kentico-cms:jsGlobal:2",
			kind: "jsGlobal",
			property: "CMS.Application",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kentico-cms:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^CMSCookieLevel$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "kentico-cms:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^CMSPreferredCulture$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "kentico-cms:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Kentico CMS ([\\d.R]+ \\(build [\\d.]+\\))", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "kentico-cms:dom:6",
			kind: "dom",
			selector: "link[href*='/kentico/bundles/pageComponents/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kentico-cms:scriptSrc:7",
			kind: "scriptSrc",
			pattern: new RegExp("\\/cmspages\\/getresource\\.ashx"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kentico-cms:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^cmscookielevel$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "kentico-cms:cookie:9",
			kind: "cookie",
			keyPattern: new RegExp("^cmspreferredculture$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "kentico-cms:meta:10",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("kentico cms ([\\d.r]+ \\(build [\\d.]+\\))", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
		cpe: "cpe:2.3:a:kentico:kentico_cms:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
