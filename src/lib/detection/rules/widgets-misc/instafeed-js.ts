import type { TechnologyDefinition } from '../../types';

export const instafeedJsTechnologyDefinition = {
	id: "instafeed-js",
	name: "Instafeed.js",
	website: "https://instafeedjs.com/",
	description: "A way to add Instagram photos to your website.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "instafeed-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("instafeed(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
