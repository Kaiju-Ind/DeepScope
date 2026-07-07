import type { TechnologyDefinition } from '../../types';

export const clerkTechnologyDefinition = {
	id: "clerk",
	name: "Clerk",
	website: "https://clerk.dev",
	description: "Clerk is an authentication and user management platform for web applications.",
	icon: "Clerk.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "clerk:jsGlobal:0",
			kind: "jsGlobal",
			property: "Clerk.authenticateWithMetamask",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clerk:jsGlobal:1",
			kind: "jsGlobal",
			property: "Clerk.openSignIn",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clerk:jsGlobal:2",
			kind: "jsGlobal",
			property: "Clerk.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
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
