import type { TechnologyDefinition } from '../../types';

export const microsoftAspNetTechnologyDefinition = {
	id: "microsoft-asp-net",
	name: "Microsoft ASP.NET",
	website: "https://www.asp.net",
	description: "ASP. NET is an open-source, server-side web-application framework designed for web development to produce dynamic web pages.",
	icon: "Microsoft ASP.NET.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "microsoft-asp-net:html:0",
			kind: "html",
			pattern: new RegExp("<input[^>]+name=\"__VIEWSTATE"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "microsoft-asp-net:url:1",
			kind: "url",
			pattern: new RegExp("\\.aspx?(?:$|\\?)"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "microsoft-asp-net:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^ASP\\.NET_SessionId$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "microsoft-asp-net:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^ASPSESSION$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "microsoft-asp-net:header:4",
			kind: "header",
			key: "X-AspNet-Version",
			valuePattern: new RegExp("(.+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "microsoft-asp-net:header:5",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^ASP\\.NET", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "microsoft-asp-net:header:6",
			kind: "header",
			key: "set-cookie",
			valuePattern: new RegExp("\\.AspNetCore", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "microsoft-asp-net:dom:7",
			kind: "dom",
			selector: "input[name*='__VIEWSTATE']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "microsoft-asp-net:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^ASP\\\\\\.NET_SessionId$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "microsoft-asp-net:cookie:9",
			kind: "cookie",
			keyPattern: new RegExp("^\\\\\\.ASPXAUTH$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "microsoft-asp-net:html:10",
			kind: "html",
			pattern: new RegExp("<input[^>]+name=\"__viewstate"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "microsoft-asp-net:cookie:11",
			kind: "cookie",
			keyPattern: new RegExp("^asp\\.net_sessionid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "microsoft-asp-net:cookie:12",
			kind: "cookie",
			keyPattern: new RegExp("^aspsession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "microsoft-asp-net:header:13",
			kind: "header",
			key: "set-cookie",
			valuePattern: new RegExp("\\.aspnetcore", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "microsoft-asp-net:header:14",
			kind: "header",
			key: "x-aspnet-version",
			valuePattern: new RegExp("(.+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "microsoft-asp-net:header:15",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^asp\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:microsoft:asp.net:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
