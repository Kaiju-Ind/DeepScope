import type { TechnologyDefinition } from '../../types';

export const forgejoTechnologyDefinition = {
	id: "forgejo",
	name: "Forgejo",
	website: "https://forgejo.org",
	description: "Forgejo is a community-driven fork of Gitea that provides a self-hosted Git service with enhancements in governance, transparency, and long-term sustainability.",
	icon: "Forgejo.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "forgejo:dom:0",
			kind: "dom",
			selector: "link[href*='/theme-forgejo-auto.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "forgejo:jsGlobal:1",
			kind: "jsGlobal",
			property: "window.config.assetVersionEncoded",
			valuePattern: new RegExp("([\\d.]+).+gitea-[\\d.]+"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "forgejo:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Forgejo – Beyond coding\\. We forge\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "forgejo:meta:3",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("forgejo – beyond coding\\. we forge\\.", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		cpe: "cpe:2.3:a:forgejo:forgejo:*:*:*:*:*:*:*:*",
	},
	implies: [
		"go",
		"jquery",
		"pwa",
		"rss",
	],
} as const satisfies TechnologyDefinition;
