import type { TechnologyDefinition } from '../../types';

export const typedocTechnologyDefinition = {
	id: "typedoc",
	name: "TypeDoc",
	website: "https://typedoc.org",
	description: "TypeDoc is an API documentation generator for TypeScript projects.",
	icon: "TypeDoc.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "typedoc:dom:0",
			kind: "dom",
			selector: "script#tsd-search-script, footer .tsd-generator a[href='https://typedoc.org/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"typescript",
	],
} as const satisfies TechnologyDefinition;
