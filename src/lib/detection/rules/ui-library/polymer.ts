import type { TechnologyDefinition } from '../../types';

export const polymerTechnologyDefinition = {
	id: "polymer",
	name: "Polymer",
	website: "https://polymer-project.org",
	icon: "Polymer.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "polymer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("polymer\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "polymer:html:1",
			kind: "html",
			pattern: new RegExp("(?:<polymer-[^>]+|<link[^>]+rel=\"import\"[^>]+\\/polymer\\.html\")"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "polymer:jsGlobal:2",
			kind: "jsGlobal",
			property: "Polymer.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "polymer:dom:3",
			kind: "dom",
			selector: "link[rel='import'][href*='/polymer.html']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
