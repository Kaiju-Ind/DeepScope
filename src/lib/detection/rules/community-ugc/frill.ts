import type { TechnologyDefinition } from '../../types';

export const frillTechnologyDefinition = {
	id: "frill",
	name: "Frill",
	website: "https://frill.co",
	description: "Frill is a platform that connects customers and businesses by enabling customers to provide feedback.",
	icon: "Frill.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "frill:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.frill\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "frill:jsGlobal:1",
			kind: "jsGlobal",
			property: "FRILL_ENV",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "frill:jsGlobal:2",
			kind: "jsGlobal",
			property: "Frill.containers",
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
