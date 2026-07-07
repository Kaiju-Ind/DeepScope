import type { TechnologyDefinition } from '../../types';

export const exponeaTechnologyDefinition = {
	id: "exponea",
	name: "Exponea",
	website: "https://go.exponea.com",
	description: "Exponea is a cloud-based marketing analysis platform suitable for large and midsize organisations in a variety of industries.",
	icon: "Exponea.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "exponea:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\.exponea\\.com)?\\/js\\/exponea\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "exponea:jsGlobal:1",
			kind: "jsGlobal",
			property: "exponea.version",
			valuePattern: new RegExp("^v([\\d.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
