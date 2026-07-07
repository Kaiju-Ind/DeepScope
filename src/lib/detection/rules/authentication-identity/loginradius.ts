import type { TechnologyDefinition } from '../../types';

export const loginradiusTechnologyDefinition = {
	id: "loginradius",
	name: "LoginRadius",
	website: "https://www.loginradius.com",
	description: "LoginRadius is a cloud based SaaS Customer Identity Access Management platform based in Canada.",
	icon: "LoginRadius.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "loginradius:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.loginradius\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "loginradius:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.lrcontent\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "loginradius:jsGlobal:2",
			kind: "jsGlobal",
			property: "LoginRadius",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "loginradius:jsGlobal:3",
			kind: "jsGlobal",
			property: "LoginRadiusDefaults",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "loginradius:jsGlobal:4",
			kind: "jsGlobal",
			property: "LoginRadiusSDK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "loginradius:jsGlobal:5",
			kind: "jsGlobal",
			property: "LoginRadiusUtility",
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
