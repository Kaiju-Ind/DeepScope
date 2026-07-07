import type { TechnologyDefinition } from '../../types';

export const hexiaTechnologyDefinition = {
	id: "hexia",
	name: "Hexia",
	website: "https://sdk.hexia.io",
	description: "Hexia is a public Application Programming Interface (API) provided by Hex Technologies for accessing its services and data.",
	icon: "Hexia.svg",
	categories: [
		"api-pattern",
		"developer-tooling",
	],
	rules: [
		{
			id: "hexia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.hexia\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hexia:jsGlobal:1",
			kind: "jsGlobal",
			property: "hexia.address",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: false,
	},
} as const satisfies TechnologyDefinition;
