import type { TechnologyDefinition } from '../../types';

export const grandnodeTechnologyDefinition = {
	id: "grandnode",
	name: "GrandNode",
	website: "https://grandnode.com",
	icon: "GrandNode.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "grandnode:html:0",
			kind: "html",
			pattern: new RegExp("(?:<!--GrandNode |<a[^>]+grandnode - Powered by |Powered by: <a[^>]+nopcommerce)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "grandnode:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^Grand\\.customer$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "grandnode:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("grandnode", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "grandnode:html:3",
			kind: "html",
			pattern: new RegExp("(?:<!--grandnode |<a[^>]+grandnode - powered by |powered by: <a[^>]+nopcommerce)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "grandnode:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^grand\\.customer$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:grandnode:grandnode:*:*:*:*:*:*:*:*",
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
