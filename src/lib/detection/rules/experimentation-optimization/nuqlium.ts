import type { TechnologyDefinition } from '../../types';

export const nuqliumTechnologyDefinition = {
	id: "nuqlium",
	name: "Nuqlium",
	website: "https://www.nuqlium.com",
	description: "Nuqlium is an integrated cloud-based online merchandising platform.",
	icon: "Nuqlium.png",
	categories: [
		"experimentation-optimization",
		"search",
	],
	rules: [
		{
			id: "nuqlium:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.nuqlium\\.com\\/api"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nuqlium:jsGlobal:1",
			kind: "jsGlobal",
			property: "nuqliumObject",
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
