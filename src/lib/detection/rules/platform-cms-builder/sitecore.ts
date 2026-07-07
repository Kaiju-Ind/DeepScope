import type { TechnologyDefinition } from '../../types';

export const sitecoreTechnologyDefinition = {
	id: "sitecore",
	name: "Sitecore",
	website: "https://www.sitecore.com/",
	description: "Sitecore provides web content management, and multichannel marketing automation software.",
	icon: "Sitecore.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sitecore:dom:0",
			kind: "dom",
			selector: "link[href*='/_sitecore/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sitecore:dom:1",
			kind: "dom",
			selector: "img[src^='/-/media/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sitecore:dom:2",
			kind: "dom",
			selector: "img[src*='/~/media/.+\\.ashx']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sitecore:jsGlobal:3",
			kind: "jsGlobal",
			property: "SitecoreUtilities",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sitecore:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^SC_ANALYTICS_GLOBAL_COOKIE$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "sitecore:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^SC_OS_SessionId$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "sitecore:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^sc_expview$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "sitecore:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^sxa_site$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "sitecore:scriptContent:8",
			kind: "scriptContent",
			pattern: new RegExp("edge\\.sitecorecloud\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "sitecore:header:9",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.sitecore\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "sitecore:probe:10",
			kind: "probe",
			pattern: new RegExp("sc_Contact"),
			description: "Probe result matches a known technology marker.",
		},
		{
			id: "sitecore:cookie:11",
			kind: "cookie",
			keyPattern: new RegExp("^sc_analytics_global_cookie$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "sitecore:cookie:12",
			kind: "cookie",
			keyPattern: new RegExp("^sc_os_sessionid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
		cpe: "cpe:2.3:a:sitecore:*:*:*:*:*:*:*:*:*",
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
