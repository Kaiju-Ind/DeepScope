import type { TechnologyDefinition } from '../../types';

export const syntaxhighlighterTechnologyDefinition = {
	id: "syntaxhighlighter",
	name: "SyntaxHighlighter",
	website: "https://github.com/syntaxhighlighter",
	icon: "SyntaxHighlighter.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "syntaxhighlighter:html:0",
			kind: "html",
			pattern: new RegExp("<(?:script|link)[^>]*sh(?:Core|Brush|ThemeDefault)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "syntaxhighlighter:jsGlobal:1",
			kind: "jsGlobal",
			property: "SyntaxHighlighter",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "syntaxhighlighter:dom:2",
			kind: "dom",
			selector: "script[src*='shCore'], script[src*='shBrush'], script[src*='shThemeDefault'], link[href*='shCore'], link[href*='shBrush'], link[href*='shThemeDefault']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "syntaxhighlighter:html:3",
			kind: "html",
			pattern: new RegExp("<(?:script|link)[^>]*sh(?:core|brush|themedefault)"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
