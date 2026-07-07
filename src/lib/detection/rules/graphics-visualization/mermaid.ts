import type { TechnologyDefinition } from '../../types';

export const mermaidTechnologyDefinition = {
	id: "mermaid",
	name: "Mermaid",
	website: "https://mermaidjs.github.io/",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "mermaid:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/mermaid(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mermaid:html:1",
			kind: "html",
			pattern: new RegExp("<div [^>]*class=[\"']mermaid[\"']>"),
			confidence: 90,
			description: "HTML contains a known technology signature.",
		},
		{
			id: "mermaid:jsGlobal:2",
			kind: "jsGlobal",
			property: "mermaid",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mermaid:dom:3",
			kind: "dom",
			selector: "div[class*='mermaid']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
