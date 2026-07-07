import type { TechnologyDefinition } from '../../types';

export const semanticUiTechnologyDefinition = {
	id: "semantic-ui",
	name: "Semantic UI",
	website: "https://semantic-ui.com/",
	description: "Semantic UI is a front-end development framework, powered by LESS and jQuery.",
	icon: "Semantic-ui.png",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "semantic-ui:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/semantic(?:-([\\d.]+))?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "semantic-ui:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]+semantic(?:\\.min)\\.css\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "semantic-ui:dom:2",
			kind: "dom",
			selector: "link[href*='/semantic.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
