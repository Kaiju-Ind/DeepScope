import type { TechnologyDefinition } from '../../types';

export const dandomainTechnologyDefinition = {
	id: "dandomain",
	name: "DanDomain",
	website: "https://dandomain.dk",
	description: "Dandomain is a Danish company specializing in website creation, hosting, and domain registration services.",
	icon: "DanDomain.svg",
	categories: [
		"platform-cms-builder",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "dandomain:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^SmartWeb$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "dandomain:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^smartweb$", "i"),
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
	requires: [
		"angularjs",
	],
} as const satisfies TechnologyDefinition;
