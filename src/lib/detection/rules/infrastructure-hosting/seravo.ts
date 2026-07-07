import type { TechnologyDefinition } from '../../types';

export const seravoTechnologyDefinition = {
	id: "seravo",
	name: "Seravo",
	website: "https://seravo.com",
	icon: "Seravo.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "seravo:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^Seravo", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "seravo:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^seravo", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
