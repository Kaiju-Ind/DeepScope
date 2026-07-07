import type { TechnologyDefinition } from '../../types';

export const ractiveJsTechnologyDefinition = {
	id: "ractive-js",
	name: "Ractive.js",
	website: "https://www.ractivejs.org",
	description: "Ractive.js is a template-driven UI library.",
	icon: "Ractive.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "ractive-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ractive\\/ractive\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
