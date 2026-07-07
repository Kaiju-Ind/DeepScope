import type { TechnologyDefinition } from '../../types';

export const craftumTechnologyDefinition = {
	id: "craftum",
	name: "Craftum",
	website: "https://craftum.com",
	description: "Craftum is an Russian website builder.",
	icon: "Craftum.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "craftum:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Craftum CMS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "craftum:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^craftum cms$", "i"),
			description: "Meta tag matches a known technology marker.",
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
