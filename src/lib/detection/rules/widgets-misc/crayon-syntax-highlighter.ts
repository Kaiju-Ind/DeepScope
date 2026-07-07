import type { TechnologyDefinition } from '../../types';

export const crayonSyntaxHighlighterTechnologyDefinition = {
	id: "crayon-syntax-highlighter",
	name: "Crayon Syntax Highlighter",
	website: "https://wordpress.org/plugins/crayon-syntax-highlighter/",
	description: "Syntax Highlighter supporting multiple languages, themes, fonts, highlighting from a URL, local file or post text.",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "crayon-syntax-highlighter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("crayon-syntax-highlighter(?:\\/js)?(?:\\/min)?(?:\\/crayon)?(?:\\.te)?(?:\\.min)?\\.js(?:\\?v(?:er)?=_((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "crayon-syntax-highlighter:dom:1",
			kind: "dom",
			selector: "link#crayon-css, link#crayon",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "crayon-syntax-highlighter:jsGlobal:2",
			kind: "jsGlobal",
			property: "CrayonSyntaxSettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "crayon-syntax-highlighter:jsGlobal:3",
			kind: "jsGlobal",
			property: "CrayonSyntaxStrings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "crayon-syntax-highlighter:jsGlobal:4",
			kind: "jsGlobal",
			property: "CrayonTagEditorSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
