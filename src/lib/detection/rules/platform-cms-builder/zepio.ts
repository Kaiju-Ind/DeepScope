import type { TechnologyDefinition } from '../../types';

export const zepioTechnologyDefinition = {
	id: "zepio",
	name: "Zepio",
	website: "https://zepio.io",
	description: "Zepio is a platform that enables creating an online store with an integrated website and delivery system, requiring no coding.",
	icon: "Zepio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zepio:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Zepio$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "zepio:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^zepio$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
