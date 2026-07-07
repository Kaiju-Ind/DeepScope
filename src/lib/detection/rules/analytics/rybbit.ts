import type { TechnologyDefinition } from '../../types';

export const rybbitTechnologyDefinition = {
	id: "rybbit",
	name: "Rybbit",
	website: "https://www.rybbit.io",
	description: "Rybbit is a privacy-focused, open-source web analytics platform that provides real-time tracking without cookies using a modular architecture and ClickHouse backend.",
	icon: "Rybbit.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "rybbit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.rybbit\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rybbit:jsGlobal:1",
			kind: "jsGlobal",
			property: "rybbit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
