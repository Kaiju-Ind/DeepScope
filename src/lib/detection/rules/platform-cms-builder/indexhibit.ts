import type { TechnologyDefinition } from '../../types';

export const indexhibitTechnologyDefinition = {
	id: "indexhibit",
	name: "Indexhibit",
	website: "https://www.indexhibit.org",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "indexhibit:html:0",
			kind: "html",
			pattern: new RegExp("<(?:link|a href) [^>]+ndxz-studio"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "indexhibit:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Indexhibit", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "indexhibit:dom:2",
			kind: "dom",
			selector: "link[href*='ndxz-studio']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "indexhibit:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("indexhibit", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:indexhibit:indexhibit:*:*:*:*:*:*:*:*",
	},
	implies: [
		"apache-http-server",
		"exhibit",
		"php",
	],
} as const satisfies TechnologyDefinition;
