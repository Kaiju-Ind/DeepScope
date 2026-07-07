import type { TechnologyDefinition } from '../../types';

export const cstateTechnologyDefinition = {
	id: "cstate",
	name: "cState",
	website: "https://github.com/cstate/cstate",
	description: "cState is an open-source static (serverless) status page.",
	icon: "cState.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "cstate:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("cState v([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cstate:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("cstate v([\\d\\.]+)", "i"),
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
} as const satisfies TechnologyDefinition;
