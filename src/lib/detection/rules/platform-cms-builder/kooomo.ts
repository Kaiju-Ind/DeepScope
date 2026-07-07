import type { TechnologyDefinition } from '../../types';

export const kooomoTechnologyDefinition = {
	id: "kooomo",
	name: "Kooomo",
	website: "https://www.kooomo.com",
	description: "Kooomo is a SaaS ecommerce platform with a focus on localisation and internationalisation.",
	icon: "Kooomo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kooomo:dom:0",
			kind: "dom",
			selector: "img[src*='.kooomo-cloud.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kooomo:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Kooomo(?: v([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "kooomo:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("kooomo(?: v([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
