import type { TechnologyDefinition } from '../../types';

export const xanoTechnologyDefinition = {
	id: "xano",
	name: "Xano",
	website: "https://www.xano.com",
	description: "Xano is a no-code backend development platform that allows users to build and manage databases, APIs, and server-side logic without writing code.",
	icon: "Xano.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "xano:jsGlobal:0",
			kind: "jsGlobal",
			property: "XanoBaseStorage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "xano:jsGlobal:1",
			kind: "jsGlobal",
			property: "XanoClient",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "xano:jsGlobal:2",
			kind: "jsGlobal",
			property: "XanoCookieStorage",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
