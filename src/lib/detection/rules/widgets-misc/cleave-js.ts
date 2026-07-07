import type { TechnologyDefinition } from '../../types';

export const cleaveJsTechnologyDefinition = {
	id: "cleave-js",
	name: "Cleave.js",
	website: "https://nosir.github.io/cleave.js/",
	description: "JavaScript library for formatting input text content when you are typing.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "cleave-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cleave(?:\\.min)?(?:\\.\\w{0,32})?\\.js(?:\\?ver=((?:\\d+\\.)+\\d+))?"),
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
