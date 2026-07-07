import type { TechnologyDefinition } from '../../types';

export const moxieTechnologyDefinition = {
	id: "moxie",
	name: "mOxie",
	website: "https://github.com/moxiecode/moxie",
	description: "mOxie is a library providing polyfills for XHR2 and File API, ensuring compatibility with older browsers that lack native support.",
	categories: [
		"api-pattern",
		"developer-tooling",
	],
	rules: [
		{
			id: "moxie:jsGlobal:0",
			kind: "jsGlobal",
			property: "mOxie",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moxie:jsGlobal:1",
			kind: "jsGlobal",
			property: "moxie",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		oss: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
