import type { TechnologyDefinition } from '../../types';

export const clarisFilemakerTechnologyDefinition = {
	id: "claris-filemaker",
	name: "Claris FileMaker",
	website: "https://www.claris.com/filemaker",
	description: "Claris FileMaker is a cross-platform relational database application from Claris International.",
	icon: "Claris.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "claris-filemaker:url:0",
			kind: "url",
			pattern: new RegExp("\\.[\\w]+\\/fmi\\/webd\\/"),
			description: "Page URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"recurring",
		],
	},
	requires: [
		"application-request-routing",
		"java",
		"vaadin",
	],
} as const satisfies TechnologyDefinition;
