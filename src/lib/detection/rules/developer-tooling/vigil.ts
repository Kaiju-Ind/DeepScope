import type { TechnologyDefinition } from '../../types';

export const vigilTechnologyDefinition = {
	id: "vigil",
	name: "Vigil",
	website: "https://github.com/valeriansaliou/vigil",
	description: "Vigil is a microservices status page. Monitors a distributed infrastructure and sends alerts (Slack, SMS, etc.).",
	icon: "default.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "vigil:dom:0",
			kind: "dom",
			selector: "p > a[href*='github.com/valeriansaliou/vigil']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "vigil:text:1",
			kind: "text",
			pattern: new RegExp("^Vigil$"),
			description: "Page text contains a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"docker",
		"rust",
	],
} as const satisfies TechnologyDefinition;
