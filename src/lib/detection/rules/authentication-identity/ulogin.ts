import type { TechnologyDefinition } from '../../types';

export const uloginTechnologyDefinition = {
	id: "ulogin",
	name: "uLogin",
	website: "https://ulogin.ru",
	description: "uLogin is a tool that enables its users to get unified access to various Internet services.",
	icon: "uLogin.png",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "ulogin:jsGlobal:0",
			kind: "jsGlobal",
			property: "uLogin.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
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
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
