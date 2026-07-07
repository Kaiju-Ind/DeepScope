import type { TechnologyDefinition } from '../../types';

export const moxieTechnologyDefinition = {
	id: "moxie",
	name: "mOxie",
	website: "https://github.com/moxiecode/moxie",
	description: "mOxie is a library providing polyfills for XHR2 and File API, ensuring compatibility with older browsers that lack native support.",
	categories: [
		"widgets-misc",
		"accessibility",
	],
	rules: [
		{
			id: "moxie:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("moxie(?:\\.min)?\\.js(?:\\?ver=([\\d.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "moxie:jsGlobal:1",
			kind: "jsGlobal",
			property: "mOxie",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moxie:jsGlobal:2",
			kind: "jsGlobal",
			property: "moxie",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
