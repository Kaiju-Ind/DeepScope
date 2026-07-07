import type { TechnologyDefinition } from '../../types';

export const nexuspipeTechnologyDefinition = {
	id: "nexuspipe",
	name: "NexusPIPE",
	website: "https://nexuspipe.com",
	description: "NexusPIPE is a ADC and DDoS mitigation Company.",
	icon: "NexusPIPE.png",
	categories: [
		"security",
	],
	rules: [
		{
			id: "nexuspipe:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Nexuspipe.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "nexuspipe:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^nexuspipe.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
