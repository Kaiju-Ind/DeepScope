import type { TechnologyDefinition } from '../../types';

export const polyfillTechnologyDefinition = {
	id: "polyfill",
	name: "Polyfill",
	website: "https://polyfill.io",
	description: "Polyfill is a service which accepts a request for a set of browser features and returns only the polyfills that are needed by the requesting browser.",
	icon: "polyfill.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "polyfill:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("polyfill\\.io\\/v([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
