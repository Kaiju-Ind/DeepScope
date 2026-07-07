import type { TechnologyDefinition } from '../../types';

export const senjaTechnologyDefinition = {
	id: "senja",
	name: "Senja",
	website: "https://senja.io",
	description: "Senja is a platform that enables the collection, management, and sharing of social proof to grow businesses.",
	icon: "Senja.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "senja:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.senja\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "senja:jsGlobal:1",
			kind: "jsGlobal",
			property: "SenjaAffiliatePoweredBy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "senja:jsGlobal:2",
			kind: "jsGlobal",
			property: "SenjaBuilderInitialized",
			description: "Page-owned global matches a known technology marker.",
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
