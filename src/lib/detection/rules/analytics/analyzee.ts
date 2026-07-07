import type { TechnologyDefinition } from '../../types';

export const analyzeeTechnologyDefinition = {
	id: "analyzee",
	name: "Analyzee",
	website: "https://analyzee.io",
	description: "Analyzee is an analytics tool that allows you to gain insights into visitor behavior and optimise your website's user experience using heatmaps and other analytics features.",
	icon: "Analyzee.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "analyzee:jsGlobal:0",
			kind: "jsGlobal",
			property: "Analyzee._sessionExtend",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "analyzee:jsGlobal:1",
			kind: "jsGlobal",
			property: "analyzee._session",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "analyzee:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.analyzee\\.io\\/sdk\\/(.*)\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
