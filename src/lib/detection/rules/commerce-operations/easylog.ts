import type { TechnologyDefinition } from '../../types';

export const easylogTechnologyDefinition = {
	id: "easylog",
	name: "Easylog",
	website: "https://www.easylog.com.br",
	description: "EasyLog is a logistics company based in Brazil.",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "easylog:text:0",
			kind: "text",
			pattern: new RegExp("\\bEasylog\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
