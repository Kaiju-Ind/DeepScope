import type { TechnologyDefinition } from '../../types';

export const rocketfyTechnologyDefinition = {
	id: "rocketfy",
	name: "Rocketfy",
	website: "https://rocketfy.mx",
	description: "Rocketfy is a platform that allows users to build an online store and allows dropshipping at the same time.",
	icon: "Rocketfy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rocketfy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.rocketfy\\.mx\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rocketfy:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Rocketfy\\sMaker\\s-\\sv([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "rocketfy:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^rocketfy\\smaker\\s-\\sv([\\d\\.]+)$", "i"),
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
			"payg",
		],
	},
	implies: [
		"next-js",
		"react",
	],
} as const satisfies TechnologyDefinition;
