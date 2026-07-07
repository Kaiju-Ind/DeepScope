import type { TechnologyDefinition } from '../../types';

export const flarumTechnologyDefinition = {
	id: "flarum",
	name: "Flarum",
	website: "https://flarum.org/",
	description: "Flarum is a discussion platform.",
	icon: "flarum.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "flarum:html:0",
			kind: "html",
			pattern: new RegExp("<div id=\"flarum-loading\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "flarum:jsGlobal:1",
			kind: "jsGlobal",
			property: "app.cache.discussionList",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flarum:jsGlobal:2",
			kind: "jsGlobal",
			property: "app.forum.freshness",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flarum:dom:3",
			kind: "dom",
			selector: "div[id*='flarum-loading']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:flarum:flarum:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
