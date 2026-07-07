import type { TechnologyDefinition } from '../../types';

export const windowsCeTechnologyDefinition = {
	id: "windows-ce",
	name: "Windows CE",
	website: "https://microsoft.com",
	description: "Windows CE is an operating system designed for small footprint devices or embedded systems.",
	icon: "Microsoft.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "windows-ce:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("\\bWinCE\\b", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "windows-ce:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("\\bwince\\b", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
