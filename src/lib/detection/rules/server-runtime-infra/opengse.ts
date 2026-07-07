import type { TechnologyDefinition } from '../../types';

export const opengseTechnologyDefinition = {
	id: "opengse",
	name: "OpenGSE",
	website: "https://code.google.com/p/opengse",
	description: "OpenGSE is a test suite used for testing servlet compliance. It is deployed by using WAR files that are deployed on the server engine.",
	icon: "Google.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "opengse:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("GSE", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "opengse:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("gse", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
