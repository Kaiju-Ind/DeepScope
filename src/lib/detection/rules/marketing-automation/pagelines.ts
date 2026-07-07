import type { TechnologyDefinition } from '../../types';

export const pagelinesTechnologyDefinition = {
	id: "pagelines",
	name: "PageLines",
	website: "https://www.pagelines.com",
	description: "PageLines is a platform that provides AI assistants designed to support revenue teams by automating tasks, analyzing data, and improving efficiency across sales and revenue-related workflows.",
	icon: "PageLines.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pagelines:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/pagelines\\/js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
		cpe: "cpe:2.3:a:pagelines:pagelines:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
