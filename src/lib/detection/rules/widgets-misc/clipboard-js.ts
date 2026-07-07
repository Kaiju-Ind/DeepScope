import type { TechnologyDefinition } from '../../types';

export const clipboardJsTechnologyDefinition = {
	id: "clipboard-js",
	name: "Clipboard.js",
	website: "https://clipboardjs.com/",
	description: "Clipboard.js is a JavaScript library for copy-to-clipboard interactions.",
	icon: "Clipboard.js.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "clipboard-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("clipboard(?:-([\\d.]+))?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
