import type { TechnologyDefinition } from '../../types';

export const materializeCssTechnologyDefinition = {
	id: "materialize-css",
	name: "Materialize CSS",
	website: "https://materializecss.com",
	description: "Materialize CSS is a front-end framework that helps developers create responsive and mobile-first web applications. It is based on Google's Material Design guidelines.",
	icon: "Materialize CSS.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "materialize-css:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("([\\d\\.]+)\\/.*\\/materialize\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "materialize-css:dom:1",
			kind: "dom",
			selector: "link[href*='/materialize.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
