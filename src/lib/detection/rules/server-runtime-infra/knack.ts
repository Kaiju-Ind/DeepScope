import type { TechnologyDefinition } from '../../types';

export const knackTechnologyDefinition = {
	id: "knack",
	name: "Knack",
	website: "https://www.knack.com",
	description: "Knack is a tool designed to build online databases and web applications, providing a platform for creating custom applications without extensive programming knowledge.",
	icon: "Knack.svg",
	categories: [
		"server-runtime-infra",
		"framework",
	],
	rules: [
		{
			id: "knack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("loader\\.knack\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "knack:jsGlobal:1",
			kind: "jsGlobal",
			property: "Knack",
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
