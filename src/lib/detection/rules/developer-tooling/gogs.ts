import type { TechnologyDefinition } from '../../types';

export const gogsTechnologyDefinition = {
	id: "gogs",
	name: "Gogs",
	website: "https://gogs.io",
	description: "Gogs is a self-hosted Git service written in Go.",
	icon: "gogs.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "gogs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\/gogs\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gogs:html:1",
			kind: "html",
			pattern: new RegExp("<div class=\"ui left\">\\n\\s+© \\d{4} Gogs Version: ([\\d.]+) Page:"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gogs:html:2",
			kind: "html",
			pattern: new RegExp("<button class=\"ui basic clone button\" id=\"repo-clone-ssh\" data-link=\"gogs@"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gogs:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^i_like_gogits$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "gogs:meta:4",
			kind: "meta",
			key: "keywords",
			valuePattern: new RegExp("go, git, self-hosted, gogs", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "gogs:html:5",
			kind: "html",
			pattern: new RegExp("<div class=\"ui left\">\\n\\s+© \\d{4} gogs version: ([\\d.]+) page:"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:gogs:gogs:*:*:*:*:*:*:*:*",
	},
	implies: [
		"go",
		"macaron",
	],
} as const satisfies TechnologyDefinition;
