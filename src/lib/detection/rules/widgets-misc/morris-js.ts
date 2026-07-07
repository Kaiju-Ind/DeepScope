import type { TechnologyDefinition } from '../../types';

export const morrisJsTechnologyDefinition = {
	id: "morris-js",
	name: "Morris.js",
	website: "https://morrisjs.github.io/morris.js/",
	description: "A JavaScript library that simplifies the process of creating interactive and responsive data visualizations on the web.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "morris-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("morris(?:\\/(?:area|bar|donut|grid|hover|line))?(?:\\.min)?\\.js(?:\\?ver=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"jquery",
		"raphael",
	],
} as const satisfies TechnologyDefinition;
