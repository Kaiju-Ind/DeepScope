import type { TechnologyDefinition } from '../../types';

export const umbracoTechnologyDefinition = {
	id: "umbraco",
	name: "Umbraco",
	website: "https://umbraco.com/",
	description: "Umbraco is an open-source Microsoft ASP.NET based content management system.",
	icon: "Umbraco.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "umbraco:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\/Umbraco\\/Api\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "umbraco:url:1",
			kind: "url",
			pattern: new RegExp("\\/umbraco\\/login\\.aspx(?:$|\\?)"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "umbraco:requestUrl:2",
			kind: "requestUrl",
			pattern: new RegExp("\\/umbraco\\/api\\/"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "umbraco:dom:3",
			kind: "dom",
			selector: "script[src*='/UmbracoForms/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "umbraco:jsGlobal:4",
			kind: "jsGlobal",
			property: "ITEM_INFO_SERVICE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "umbraco:jsGlobal:5",
			kind: "jsGlobal",
			property: "UC_IMAGE_SERVICE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "umbraco:jsGlobal:6",
			kind: "jsGlobal",
			property: "UC_ITEM_INFO_SERVICE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "umbraco:jsGlobal:7",
			kind: "jsGlobal",
			property: "UC_SETTINGS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "umbraco:jsGlobal:8",
			kind: "jsGlobal",
			property: "Umbraco",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "umbraco:header:9",
			kind: "header",
			key: "X-Umbraco-Version",
			valuePattern: new RegExp("^(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "umbraco:meta:10",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("umbraco", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "umbraco:scriptContent:11",
			kind: "scriptContent",
			pattern: new RegExp("\\.umbraco\\.io|\\/Umbraco\\/Api"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "umbraco:dom:12",
			kind: "dom",
			selector: "a[data-udi^='umb://']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "umbraco:dom:13",
			kind: "dom",
			selector: "form[action^='/umbraco/Surface/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "umbraco:dom:14",
			kind: "dom",
			selector: "a[href^='/umbraco/Surface/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "umbraco:dom:15",
			kind: "dom",
			selector: "fieldset.umbraco-forms-fieldset",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "umbraco:cookie:16",
			kind: "cookie",
			keyPattern: new RegExp("^merchello$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "umbraco:scriptContent:17",
			kind: "scriptContent",
			pattern: new RegExp("\\/umbraco\\/api\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "umbraco:header:18",
			kind: "header",
			key: "x-umbraco-version",
			valuePattern: new RegExp("^(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "umbraco:scriptSrc:19",
			kind: "scriptSrc",
			pattern: new RegExp("\\/assets\\/umbracoforms_custom\\.[a-f0-9]+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "umbraco:dom:20",
			kind: "dom",
			selector: "base[href*='/umbraco/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:umbraco:umbraco:*:*:*:*:*:*:*:*",
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
