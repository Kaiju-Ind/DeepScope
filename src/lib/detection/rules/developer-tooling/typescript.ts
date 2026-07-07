import type { TechnologyDefinition } from '../../types';

export const typescriptTechnologyDefinition = {
	id: "typescript",
	name: "TypeScript",
	website: "https://www.typescriptlang.org",
	description: "TypeScript is an open-source language which builds on JavaScript  by adding static type definitions.",
	icon: "TypeScript.svg",
	categories: [
		"developer-tooling",
	],
	rules: [],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
