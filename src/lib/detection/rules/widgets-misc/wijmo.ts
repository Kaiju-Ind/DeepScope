import type { TechnologyDefinition } from '../../types';

export const wijmoTechnologyDefinition = {
	id: "wijmo",
	name: "Wijmo",
	website: "https://developer.mescius.com/wijmo",
	description: "Wijmo is a JavaScript UI component library built in TypeScript, ideal for developing lightweight, high-speed HTML5/JavaScript applications with no dependencies, and designed for enterprise use.",
	icon: "Wijmo.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "wijmo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/Scripts\\/Acts\\/Wijmo\\/wijmo\\.min\\.js\\?v=([\\d]+\\.\\d+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wijmo:jsGlobal:1",
			kind: "jsGlobal",
			property: "wijmo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wijmo:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/scripts\\/acts\\/wijmo\\/wijmo\\.min\\.js\\?v=([\\d]+\\.\\d+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
