import type { TechnologyDefinition } from '../../types';

export const closureLibraryTechnologyDefinition = {
	id: "closure-library",
	name: "Closure Library",
	website: "https://github.com/google/closure-library",
	description: "Closure Library is a JavaScript library developed by Google for building robust web applications, offering utilities for DOM manipulation, event handling, data structures, and more.",
	icon: "Google.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "closure-library:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:closure-library|goog/base\\.js|closure/goog)", "i"),
			description: "Script source URL contains a Closure Library marker.",
		},
		{
			id: "closure-library:html:2",
			kind: "html",
			pattern: new RegExp("Copyright\\s+The\\s+Closure\\s+Library\\s+Authors", "i"),
			confidence: 90,
			description: "Document HTML contains the Closure Library copyright marker.",
		},
		{
			id: "closure-library:text:1",
			kind: "text",
			pattern: new RegExp("Copyright\\sThe\\sClosure\\sLibrary\\sAuthors"),
			description: "Page text contains a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:google:closure_library:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
