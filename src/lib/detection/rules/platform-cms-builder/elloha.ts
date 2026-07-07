import type { TechnologyDefinition } from '../../types';

export const ellohaTechnologyDefinition = {
	id: "elloha",
	name: "Elloha",
	website: "https://elloha.com",
	description: "Elloha is an all-in-one platform designed to manage and increase tourism-related revenue.",
	icon: "Elloha.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "elloha:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.elloha\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "elloha:jsGlobal:1",
			kind: "jsGlobal",
			property: "IsEllohaPointOfSale",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "elloha:header:2",
			kind: "header",
			key: "Access-Control-Allow-Headers",
			valuePattern: new RegExp("\\.elloha\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "elloha:header:3",
			kind: "header",
			key: "access-control-allow-headers",
			valuePattern: new RegExp("\\.elloha\\.com", "i"),
			description: "Response header matches a known technology marker.",
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
