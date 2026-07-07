import type { TechnologyDefinition } from '../../types';

export const strapdownJsTechnologyDefinition = {
	id: "strapdown-js",
	name: "Strapdown.js",
	website: "https://strapdownjs.com",
	icon: "strapdown.js.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "strapdown-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("strapdown\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"bootstrap",
		"google-code-prettify",
	],
} as const satisfies TechnologyDefinition;
