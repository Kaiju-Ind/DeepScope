import type { TechnologyDefinition } from '../../types';

export const clockworkTechnologyDefinition = {
	id: "clockwork",
	name: "Clockwork",
	website: "https://github.com/underground-works/clockwork-app",
	description: "Clockwork is a development tool for PHP available right in your browser.",
	icon: "default.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "clockwork:header:0",
			kind: "header",
			key: "x-clockwork-version",
			valuePattern: new RegExp("^([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
