import type { TechnologyDefinition } from '../../types';

export const getsocialTechnologyDefinition = {
	id: "getsocial",
	name: "GetSocial",
	website: "https://getsocial.io",
	description: "GetSocial is a social analytics and publishing platform.",
	icon: "GetSocial.png",
	categories: [
		"authentication-identity",
		"analytics",
	],
	rules: [
		{
			id: "getsocial:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.at\\.getsocial\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "getsocial:jsGlobal:1",
			kind: "jsGlobal",
			property: "GETSOCIAL_VERSION",
			valuePattern: new RegExp("(.+)"),
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
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
