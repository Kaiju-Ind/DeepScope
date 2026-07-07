import type { TechnologyDefinition } from '../../types';

export const upptimeTechnologyDefinition = {
	id: "upptime",
	name: "Upptime",
	website: "https://upptime.js.org",
	description: "Upptime is the open-source uptime monitor and status page, powered entirely by GitHub Actions, Issues, and Pages.",
	icon: "Upptime.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "upptime:dom:0",
			kind: "dom",
			selector: "p > a[href*='upptime.js.org']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "upptime:text:1",
			kind: "text",
			pattern: new RegExp("^Upptime$"),
			description: "Page text contains a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
