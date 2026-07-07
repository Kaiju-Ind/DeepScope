import type { TechnologyDefinition } from '../../types';

export const prefixFreeTechnologyDefinition = {
	id: "prefix-free",
	name: "Prefix-Free",
	website: "https://leaverou.github.io/prefixfree/",
	description: "Prefix-Free is a JavaScript library that automatically removes browser vendor prefixes from CSS properties, enabling developers to use standard CSS without worrying about cross-browser compatibility issues.",
	icon: "Prefix-Free.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "prefix-free:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("prefixfree\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "prefix-free:jsGlobal:1",
			kind: "jsGlobal",
			property: "PrefixFree",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
