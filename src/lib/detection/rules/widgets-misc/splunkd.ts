import type { TechnologyDefinition } from '../../types';

export const splunkdTechnologyDefinition = {
	id: "splunkd",
	name: "Splunkd",
	website: "https://splunk.com",
	description: "Splunkd is the system process that handles indexing, searching, forwarding.",
	icon: "Splunk.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "splunkd:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Splunkd", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "splunkd:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("splunkd", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
