import type { TechnologyDefinition } from '../../types';

export const mantisTechnologyDefinition = {
	id: "mantis",
	name: "Mantis",
	website: "https://www.mantisadnetwork.com",
	description: "Mantis is an end-to-end advertising network catering to brands operating in the legal cannabis industry and ancillary markets.",
	icon: "Mantis.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "mantis:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mantisadnetwork\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mantis:jsGlobal:1",
			kind: "jsGlobal",
			property: "mantis",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mantis:jsGlobal:2",
			kind: "jsGlobal",
			property: "mantistimer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
