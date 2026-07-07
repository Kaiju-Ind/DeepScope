import type { TechnologyDefinition } from '../../types';

export const cpanelTechnologyDefinition = {
	id: "cpanel",
	name: "cPanel",
	website: "https://www.cpanel.net",
	description: "cPanel is a web hosting control panel. The software provides a graphical interface and automation tools designed to simplify the process of hosting a website.",
	icon: "cPanel.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "cpanel:html:0",
			kind: "html",
			pattern: new RegExp("<!-- cPanel"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "cpanel:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^cprelogin$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "cpanel:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^cpsession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "cpanel:header:3",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("cpsrvd\\/([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "cpanel:html:4",
			kind: "html",
			pattern: new RegExp("<!-- cpanel"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "cpanel:header:5",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("cpsrvd\\/([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:cpanel:cpanel:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
