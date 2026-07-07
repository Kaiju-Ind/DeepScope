import type { TechnologyDefinition } from '../../types';

export const hugoTechnologyDefinition = {
	id: "hugo",
	name: "Hugo",
	website: "https://gohugo.io",
	description: "Hugo is an open-source static site generator written in Go.",
	icon: "Hugo.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "hugo:dom:0",
			kind: "dom",
			selector: "a[href*='hugo.']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "hugo:text:1",
			kind: "text",
			pattern: new RegExp("Hugo"),
			confidence: 99,
			description: "Page text contains a known technology marker.",
		},
		{
			id: "hugo:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Hugo ([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "hugo:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("hugo ([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
