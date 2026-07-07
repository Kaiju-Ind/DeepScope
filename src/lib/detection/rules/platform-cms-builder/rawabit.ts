import type { TechnologyDefinition } from '../../types';

export const rawabitTechnologyDefinition = {
	id: "rawabit",
	name: "Rawabit",
	website: "https://www.rawabit.me",
	description: "Rawabit is a website builder that lets small businesses design landing pages, modify sections, and embed content links using a drag and drop editor.",
	icon: "Rawabit.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rawabit:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^rawabit_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "rawabit:meta:1",
			kind: "meta",
			key: "powered-by",
			valuePattern: new RegExp("^Rawabit$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "rawabit:meta:2",
			kind: "meta",
			key: "powered-by",
			valuePattern: new RegExp("^rawabit$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
