import type { TechnologyDefinition } from '../../types';

export const phpwindTechnologyDefinition = {
	id: "phpwind",
	name: "phpwind",
	website: "https://www.phpwind.net",
	icon: "phpwind.png",
	categories: [
		"platform-cms-builder",
		"community-ugc",
	],
	rules: [
		{
			id: "phpwind:html:0",
			kind: "html",
			pattern: new RegExp("(?:Powered|Code) by <a href=\"[^\"]+phpwind\\.net"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phpwind:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^phpwind(?: v([0-9-]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "phpwind:html:2",
			kind: "html",
			pattern: new RegExp("(?:powered|code) by <a href=\"[^\"]+phpwind\\.net"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:phpwind:phpwind:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
