import type { TechnologyDefinition } from '../../types';

export const mithrilJsTechnologyDefinition = {
	id: "mithril-js",
	name: "Mithril.js",
	website: "https://mithril.js.org",
	description: "Mithril.js is a lightweight JavaScript framework for building efficient and declarative single-page applications (SPAs).",
	icon: "Mithril.js.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "mithril-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/mithril(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
