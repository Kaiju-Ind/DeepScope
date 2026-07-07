import type { TechnologyDefinition } from '../../types';

export const matomoTechnologyDefinition = {
	id: "matomo",
	name: "Matomo",
	website: "https://matomo.org/",
	description: "Google Analytics alternative that protects your data and your customers privacy",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "matomo:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("matomo not loaded yet, waiting for it to be loaded"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "matomo:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("cdn\\.matomo\\.cloud"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
