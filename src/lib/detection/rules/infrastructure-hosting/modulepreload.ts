import type { TechnologyDefinition } from '../../types';

export const modulepreloadTechnologyDefinition = {
	id: "modulepreload",
	name: "Module Preload",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/modulepreload",
	description: "Preloads an ES module graph before execution.",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "modulepreload:link:0",
			kind: "link",
			rel: "modulepreload",
			confidence: 100,
			description: "Document uses rel=modulepreload.",
		},
	],
} as const satisfies TechnologyDefinition;
