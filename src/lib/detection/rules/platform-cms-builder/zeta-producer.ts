import type { TechnologyDefinition } from '../../types';

export const zetaProducerTechnologyDefinition = {
	id: "zeta-producer",
	name: "Zeta Producer",
	website: "https://www.zeta-producer.com",
	description: "Zeta Producer is a professional homepage builder for Windows that enables users to create websites.",
	icon: "ZetaProducer.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zeta-producer:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Zeta Producer ([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "zeta-producer:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^zeta producer ([\\d\\.]+)", "i"),
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
			"freemium",
			"onetime",
		],
		cpe: "cpe:2.3:a:zeta-producer:zeta_producer:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
