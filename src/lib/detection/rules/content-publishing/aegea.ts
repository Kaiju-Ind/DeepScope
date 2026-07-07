import type { TechnologyDefinition } from '../../types';

export const aegeaTechnologyDefinition = {
	id: "aegea",
	name: "Aegea",
	website: "https://blogengine.ru",
	description: "Aegea is a blog engine created by Ilya Birman.",
	icon: "Aegea.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "aegea:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^E2 Aegea v(\\d+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "aegea:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^(?:E2\\s)?Aegea\\s(?:v)?([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "aegea:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^(?:e2\\s)?aegea\\s(?:v)?([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"jquery",
		"php",
	],
} as const satisfies TechnologyDefinition;
