import type { TechnologyDefinition } from '../../types';

export const goTechnologyDefinition = {
	id: "go",
	name: "Go",
	website: "https://golang.org",
	description: "Go is an open source high-level programming language.",
	icon: "Go.svg",
	categories: [
		"developer-tooling",
	],
	rules: [],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:golang:go:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
