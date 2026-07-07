import type { TechnologyDefinition } from '../../types';

export const adminerTechnologyDefinition = {
	id: "adminer",
	name: "Adminer",
	website: "https://www.adminer.org",
	description: "Adminer is a lightweight, web-based database management tool that supports multiple database systems and provides a simple interface for managing databases, tables, and running SQL queries.",
	icon: "adminer.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "adminer:html:0",
			kind: "html",
			pattern: new RegExp("Adminer<\\/a> <span class=\"version\">([\\d.]+)<\\/span>"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "adminer:html:1",
			kind: "html",
			pattern: new RegExp("onclick=\"bodyClick\\(event\\);\" onload=\"verifyVersion\\('([\\d.]+)'\\);\">"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "adminer:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^adminer_key$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "adminer:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^adminer_sid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "adminer:header:4",
			kind: "header",
			key: "composed-by",
			valuePattern: new RegExp("adminer\\(([\\d.]+)\\)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "adminer:html:5",
			kind: "html",
			pattern: new RegExp("adminer<\\/a> <span class=\"version\">([\\d.]+)<\\/span>"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "adminer:html:6",
			kind: "html",
			pattern: new RegExp("onclick=\"bodyclick\\(event\\);\" onload=\"verifyversion\\('([\\d.]+)'\\);\">"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:adminer:adminer:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
