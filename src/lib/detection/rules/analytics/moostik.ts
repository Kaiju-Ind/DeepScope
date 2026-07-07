import type { TechnologyDefinition } from '../../types';

export const moostikTechnologyDefinition = {
	id: "moostik",
	name: "Moostik",
	website: "https://moostik.net",
	description: "Moostik is a French analytics counter designed to track website traffic and visitor behavior.",
	icon: "Moostik.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "moostik:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("m3\\.moostik\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "moostik:jsGlobal:1",
			kind: "jsGlobal",
			property: "moostik_scripts",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moostik:jsGlobal:2",
			kind: "jsGlobal",
			property: "moostik_this_node",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
