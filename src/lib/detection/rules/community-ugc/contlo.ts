import type { TechnologyDefinition } from '../../types';

export const contloTechnologyDefinition = {
	id: "contlo",
	name: "Contlo",
	website: "https://www.contlo.com",
	description: "Contlo is an AI powered marketing software.",
	icon: "Contlo.png",
	categories: [
		"community-ugc",
		"marketing-automation",
	],
	rules: [
		{
			id: "contlo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.contlo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "contlo:jsGlobal:1",
			kind: "jsGlobal",
			property: "CONTLO_ENV",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
