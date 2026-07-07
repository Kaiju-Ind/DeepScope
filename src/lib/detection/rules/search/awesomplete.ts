import type { TechnologyDefinition } from '../../types';

export const awesompleteTechnologyDefinition = {
	id: "awesomplete",
	name: "Awesomplete",
	website: "https://leaverou.github.io/awesomplete/",
	description: "Awesomplete is a tool in the Javascript UI Libraries category of a tech stack.",
	categories: [
		"search",
	],
	rules: [
		{
			id: "awesomplete:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/awesomplete\\.js(?:$|\\?)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "awesomplete:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]+href=\"[^>]*awesomplete(?:\\.min)?\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "awesomplete:jsGlobal:2",
			kind: "jsGlobal",
			property: "awesomplete",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "awesomplete:jsGlobal:3",
			kind: "jsGlobal",
			property: "Awesomplete",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
