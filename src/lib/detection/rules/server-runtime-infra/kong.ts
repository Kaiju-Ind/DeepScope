import type { TechnologyDefinition } from '../../types';

export const kongTechnologyDefinition = {
	id: "kong",
	name: "Kong",
	website: "https://konghq.com",
	description: "Kong is an open-source API gateway and platform that acts as middleware between compute clients and the API-centric applications.",
	icon: "Kong.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "kong:header:0",
			kind: "header",
			key: "via",
			valuePattern: new RegExp("^kong\\/([\\d\\.]+)(?:.+)?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
			"payg",
		],
		cpe: "cpe:2.3:a:konghq:kong:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
