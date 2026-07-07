import type { TechnologyDefinition } from '../../types';

export const kSupTechnologyDefinition = {
	id: "k-sup",
	name: "K-Sup",
	website: "https://www.ksup.org/",
	description: "K-Sup is an open-source CMS/portal solution dedicated to higher education and research created by Kosmos Education.",
	icon: "Kosmos.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "k-sup:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^K-Sup \\(([\\d.R]+)\\)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "k-sup:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^k-sup \\(([\\d.r]+)\\)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
