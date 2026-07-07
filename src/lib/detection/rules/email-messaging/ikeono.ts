import type { TechnologyDefinition } from '../../types';

export const ikeonoTechnologyDefinition = {
	id: "ikeono",
	name: "Ikeono",
	website: "https://www.ikeono.com",
	description: "Ikeono is an all-in-one communication tool that provides business text messaging solutions for independent retailers.",
	icon: "Ikeono.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "ikeono:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.ikeono\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ikeono:jsGlobal:1",
			kind: "jsGlobal",
			property: "ikeono",
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
