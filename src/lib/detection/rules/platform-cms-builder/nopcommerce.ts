import type { TechnologyDefinition } from '../../types';

export const nopcommerceTechnologyDefinition = {
	id: "nopcommerce",
	name: "nopCommerce",
	website: "https://www.nopcommerce.com",
	description: "nopCommerce is an open-source ecommerce solution based on Microsoft's ASP​.NET Core framework and MS SQL Server 2012 (or higher) backend database.",
	icon: "nopCommerce.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "nopcommerce:html:0",
			kind: "html",
			pattern: new RegExp("(?:<!--Powered by nopCommerce|Powered by: <a[^>]+nopcommerce)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "nopcommerce:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^Nop\\.customer$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "nopcommerce:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^nopCommerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "nopcommerce:html:3",
			kind: "html",
			pattern: new RegExp("(?:<!--powered by nopcommerce|powered by: <a[^>]+nopcommerce)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "nopcommerce:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^nop\\.customer$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "nopcommerce:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^nopcommerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:nopcommerce:nopcommerce:*:*:*:*:*:*:*:*",
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
