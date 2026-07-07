import type { TechnologyDefinition } from '../../types';

export const webawesomeTechnologyDefinition = {
	id: "webawesome",
	name: "WebAwesome",
	website: "https://webawesome.com/",
	description: "Web Awesome is an open-source library of customizable, standards-based, and framework-agnostic UI components designed to support interoperable web interfaces.",
	icon: "WebAwesome.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "webawesome:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/webawesome\\.loader\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "webawesome:dom:1",
			kind: "dom",
			selector: "link[href*='/dist-cdn/styles/webawesome.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
