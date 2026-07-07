import type { TechnologyDefinition } from '../../types';

export const feednamiTechnologyDefinition = {
	id: "feednami",
	name: "Feednami",
	website: "https://toolkit.sekando.com/docs/en/feednami",
	description: "Feednami is a web service developed as a replacement for the discontinued Google Feed API, enabling applications to access and parse RSS and Atom feeds.",
	categories: [
		"api-pattern",
		"developer-tooling",
	],
	rules: [
		{
			id: "feednami:jsGlobal:0",
			kind: "jsGlobal",
			property: "feednami.load",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "feednami:jsGlobal:1",
			kind: "jsGlobal",
			property: "feednami.promiseLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: false,
	},
} as const satisfies TechnologyDefinition;
