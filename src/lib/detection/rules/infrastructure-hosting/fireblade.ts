import type { TechnologyDefinition } from '../../types';

export const firebladeTechnologyDefinition = {
	id: "fireblade",
	name: "Fireblade",
	website: "https://fireblade.com",
	icon: "Fireblade.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "fireblade:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("fbs", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "fireblade:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("fbs", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
