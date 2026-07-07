import type { TechnologyDefinition } from '../../types';

export const ovaTechnologyDefinition = {
	id: "ova",
	name: "Ova",
	website: "https://ova.net.au",
	description: "Ova is a website builder platform from Australia.",
	icon: "Ova.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ova:jsGlobal:0",
			kind: "jsGlobal",
			property: "cffOptions.placeholder",
			valuePattern: new RegExp("\\.ova\\.net\\.au\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ova:jsGlobal:1",
			kind: "jsGlobal",
			property: "cffOptions.resized_url",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
