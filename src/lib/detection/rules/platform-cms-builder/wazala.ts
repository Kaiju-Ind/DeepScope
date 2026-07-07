import type { TechnologyDefinition } from '../../types';

export const wazalaTechnologyDefinition = {
	id: "wazala",
	name: "Wazala",
	website: "https://www.wazala.com",
	description: "Wazala is an ecommerce shopping cart solution, enabling users to open and manage online stores.",
	icon: "Wazala.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wazala:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.wazala\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wazala:jsGlobal:1",
			kind: "jsGlobal",
			property: "WazalaWidget",
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
