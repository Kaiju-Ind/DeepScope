import type { TechnologyDefinition } from '../../types';

export const hatenaBlogTechnologyDefinition = {
	id: "hatena-blog",
	name: "Hatena Blog",
	website: "https://hatenablog.com",
	description: "Hatena Blog is one of the traditional blog platforms in Japan.",
	icon: "Hatena.svg",
	categories: [
		"platform-cms-builder",
		"content-publishing",
	],
	rules: [
		{
			id: "hatena-blog:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.blog\\.st-hatena\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
