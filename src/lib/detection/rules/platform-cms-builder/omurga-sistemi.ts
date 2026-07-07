import type { TechnologyDefinition } from '../../types';

export const omurgaSistemiTechnologyDefinition = {
	id: "omurga-sistemi",
	name: "Omurga Sistemi",
	website: "https://www.os.com.tr",
	icon: "Omurga Sistemi.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "omurga-sistemi:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^OS-Omurga Sistemi", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "omurga-sistemi:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^os-omurga sistemi", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
