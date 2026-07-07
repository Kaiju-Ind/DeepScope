import type { TechnologyDefinition } from '../../types';

export const neosFlowTechnologyDefinition = {
	id: "neos-flow",
	name: "Neos Flow",
	website: "https://flow.neos.io",
	icon: "Neos.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "neos-flow:header:0",
			kind: "header",
			key: "X-Flow-Powered",
			valuePattern: new RegExp("Flow\\/?(.+)?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "neos-flow:header:1",
			kind: "header",
			key: "x-flow-powered",
			valuePattern: new RegExp("flow\\/?(.+)?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
	excludes: [
		"typo3-cms",
	],
} as const satisfies TechnologyDefinition;
