import type { TechnologyDefinition } from '../../types';

export const sqreenTechnologyDefinition = {
	id: "sqreen",
	name: "Sqreen",
	website: "https://sqreen.io",
	description: "Sqreen is the application security platform for the modern enterprise. Acquired by Datadog in Apr 2021.",
	icon: "Sqreen.svg",
	categories: [
		"security",
		"widgets-misc",
	],
	rules: [
		{
			id: "sqreen:header:0",
			kind: "header",
			key: "X-Protected-By",
			valuePattern: new RegExp("^Sqreen$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "sqreen:header:1",
			kind: "header",
			key: "x-protected-by",
			valuePattern: new RegExp("^sqreen$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
