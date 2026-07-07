import type { TechnologyDefinition } from '../../types';

export const lodelTechnologyDefinition = {
	id: "lodel",
	name: "Lodel",
	website: "https://lodel.hypotheses.org",
	description: "Lodel is a software designed to support editorial teams in producing academic electronic publications.",
	icon: "Lodel.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "lodel:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Lodel ([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "lodel:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("lodel ([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
