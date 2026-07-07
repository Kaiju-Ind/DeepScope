import type { TechnologyDefinition } from '../../types';

export const blippaTechnologyDefinition = {
	id: "blippa",
	name: "Blippa",
	website: "https://blippa.com",
	description: "Blippa is a platform for digital product passports, enabling no-code product lifecycle management and integration with smart services and data.",
	icon: "Blippa.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "blippa:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("blippa\\.constants"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "blippa:header:1",
			kind: "header",
			key: "X-Servedby",
			valuePattern: new RegExp("^blippa1$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "blippa:header:2",
			kind: "header",
			key: "x-servedby",
			valuePattern: new RegExp("^blippa1$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
