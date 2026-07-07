import type { TechnologyDefinition } from '../../types';

export const bulmaTechnologyDefinition = {
	id: "bulma",
	name: "Bulma",
	website: "https://bulma.io",
	description: "Bulma is an open-source CSS framework based on Flexbox.",
	icon: "Bulma.svg",
	categories: [
		"styling-library",
		"component-library",
	],
	rules: [
		{
			id: "bulma:dom:0",
			kind: "dom",
			selector: "link[href*='bulma']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "bulma:jsGlobal:1",
			kind: "jsGlobal",
			property: "Bulma.VERSION",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bulma:dom:2",
			kind: "dom",
			selector: "link[href*='bulma-'][href$='.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
