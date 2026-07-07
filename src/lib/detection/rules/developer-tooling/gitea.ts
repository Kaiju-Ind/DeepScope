import type { TechnologyDefinition } from '../../types';

export const giteaTechnologyDefinition = {
	id: "gitea",
	name: "Gitea",
	website: "https://gitea.io",
	description: "Gitea is an open-source forge software package for hosting software development version control using Git as well as other collaborative features like bug tracking, wikis and code review. It supports self-hosting but also provides a free public first-party instance hosted on DiDi's cloud.",
	icon: "gitea.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "gitea:html:0",
			kind: "html",
			pattern: new RegExp("<div class=\"ui left\">\\n\\s+© Gitea Version: ([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gitea:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^i_like_gitea$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "gitea:meta:2",
			kind: "meta",
			key: "keywords",
			valuePattern: new RegExp("^go,git,self-hosted,gitea$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "gitea:jsGlobal:3",
			kind: "jsGlobal",
			property: "window.config.assetVersionEncoded",
			valuePattern: new RegExp(".+-gitea-([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gitea:html:4",
			kind: "html",
			pattern: new RegExp("<div class=\"ui left\">\\n\\s+© gitea version: ([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
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
		cpe: "cpe:2.3:a:gitea:gitea:*:*:*:*:*:*:*:*",
	},
	implies: [
		"go",
	],
} as const satisfies TechnologyDefinition;
