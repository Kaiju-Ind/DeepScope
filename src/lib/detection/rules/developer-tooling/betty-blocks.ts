import type { TechnologyDefinition } from '../../types';

export const bettyBlocksTechnologyDefinition = {
	id: "betty-blocks",
	name: "Betty Blocks",
	website: "https://www.bettyblocks.com",
	description: "Betty Blocks is a cloud-based application development solution featuring a no-code, drag-and-drop interface for developing business applications.",
	icon: "Betty Blocks.svg",
	categories: [
		"developer-tooling",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "betty-blocks:meta:0",
			kind: "meta",
			key: "description",
			valuePattern: new RegExp("^Made with Betty Blocks$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "betty-blocks:meta:1",
			kind: "meta",
			key: "description",
			valuePattern: new RegExp("^made with betty blocks$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"react",
	],
} as const satisfies TechnologyDefinition;
