import type { TechnologyDefinition } from '../../types';

export const pagelyTechnologyDefinition = {
	id: "pagely",
	name: "Pagely",
	website: "https://pagely.com/",
	icon: "pagely.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "pagely:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Pagely", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "pagely:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^pagely", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"amazon-web-services",
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
