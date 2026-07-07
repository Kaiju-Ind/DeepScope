import type { TechnologyDefinition } from '../../types';

export const turbopackTechnologyDefinition = {
	id: "turbopack",
	name: "Turbopack",
	website: "https://nextjs.org/docs/app/api-reference/turbopack",
	description: "Turbopack is an incremental bundler for JavaScript and TypeScript, written in Rust and integrated into the Next.js framework for optimized build performance.",
	icon: "Turbopack.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "turbopack:jsGlobal:0",
			kind: "jsGlobal",
			property: "TURBOPACK.push",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "turbopack:jsGlobal:1",
			kind: "jsGlobal",
			property: "TURBOPACK",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"next-js",
	],
} as const satisfies TechnologyDefinition;
