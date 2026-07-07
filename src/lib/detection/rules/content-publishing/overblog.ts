import type { TechnologyDefinition } from '../../types';

export const overblogTechnologyDefinition = {
	id: "overblog",
	name: "Overblog",
	website: "https://www.over-blog.com",
	description: "Overblog is a French blog platform that enables users to create and share content.",
	icon: "OverBlog.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "overblog:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.over-blog-kiwi\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
