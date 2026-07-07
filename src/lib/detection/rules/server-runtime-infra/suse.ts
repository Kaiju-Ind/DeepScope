import type { TechnologyDefinition } from '../../types';

export const suseTechnologyDefinition = {
	id: "suse",
	name: "SUSE",
	website: "https://suse.com",
	description: "SUSE is a Linux-based server operating system.",
	icon: "SUSE.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "suse:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("SUSE(?:\\/?\\s?-?([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "suse:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("SUSE(?:\\/?\\s?-?([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "suse:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("suse(?:\\/?\\s?-?([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "suse:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("suse(?:\\/?\\s?-?([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
