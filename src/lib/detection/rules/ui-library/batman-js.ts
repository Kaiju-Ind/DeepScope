import type { TechnologyDefinition } from '../../types';

export const batmanJsTechnologyDefinition = {
	id: "batman-js",
	name: "Batman.js",
	website: "https://batmanjs.org",
	description: "Batman.js is a framework for building rich web applications using CoffeeScript or JavaScript.",
	icon: "BatmanJS.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "batman-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(^|\\/)(batman\\.js)(\\?|$)"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
