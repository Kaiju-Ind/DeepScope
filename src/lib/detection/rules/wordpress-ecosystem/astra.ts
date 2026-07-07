import type { TechnologyDefinition } from '../../types';

export const astraTechnologyDefinition = {
	id: "astra",
	name: "Astra",
	website: "https://wpastra.com/",
	description: "Astra is a fast, lightweight, and highly customizable WordPress Theme.",
	icon: "Astra.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "astra:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("themes\\/astra\\S*\\.js(?:\\?ver=([0-9.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "astra:dom:1",
			kind: "dom",
			selector: "link[href*='themes/astra']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "astra:dom:2",
			kind: "dom",
			selector: "style[id*='astra-theme'], body[class*='astra-'], script[id*='astra-']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "astra:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("themes\\/astra\\s*\\.js(?:\\?ver=([0-9.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
		],
		cpe: "cpe:2.3:a:brainstormforce:astra:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
