import type { TechnologyDefinition } from '../../types';

export const invocaTechnologyDefinition = {
	id: "invoca",
	name: "Invoca",
	website: "https://www.invoca.com",
	description: "Invoca is an AI-powered call tracking and conversational analytics company.",
	icon: "Invoca.svg",
	categories: [
		"marketing-automation",
		"analytics",
	],
	rules: [
		{
			id: "invoca:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.dialogtech\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "invoca:jsGlobal:1",
			kind: "jsGlobal",
			property: "Invoca.PNAPI.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "invoca:jsGlobal:2",
			kind: "jsGlobal",
			property: "InvocaTagId",
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
