import type { TechnologyDefinition } from '../../types';

export const dropinblogTechnologyDefinition = {
	id: "dropinblog",
	name: "DropInBlog",
	website: "https://dropinblog.com",
	description: "DropInBlog is a remotely hosted, cloud based platform that is designed to embed a blog into your html site.",
	icon: "DropInBlog.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "dropinblog:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.dropinblog\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dropinblog:dom:1",
			kind: "dom",
			selector: "link[href*='.dropinblog.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
