import type { TechnologyDefinition } from '../../types';

export const liftTechnologyDefinition = {
	id: "lift",
	name: "Lift",
	website: "https://liftweb.net",
	description: "Lift is a secure, scalable web framework written in Scala, designed for high performance and modularity, supporting AJAX and Comet for interactive applications.",
	icon: "Lift.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "lift:header:0",
			kind: "header",
			key: "X-Lift-Version",
			valuePattern: new RegExp("(.+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "lift:header:1",
			kind: "header",
			key: "x-lift-version",
			valuePattern: new RegExp("(.+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:liftweb:lift:*:*:*:*:*:*:*:*",
	},
	implies: [
		"scala",
	],
} as const satisfies TechnologyDefinition;
