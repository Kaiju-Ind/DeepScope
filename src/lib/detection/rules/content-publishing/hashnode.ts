import type { TechnologyDefinition } from '../../types';

export const hashnodeTechnologyDefinition = {
	id: "hashnode",
	name: "Hashnode",
	website: "https://hashnode.com/",
	description: "Hashnode is a free developer blogging platform that allows you to publish articles on your own domain and helps you stay connected with a global developer community.",
	icon: "hashnode.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "hashnode:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("hashnode\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hashnode:url:1",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/[^/]+\\.(?:hashnode)\\.dev"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "hashnode:dom:2",
			kind: "dom",
			selector: "div.css-zigog8",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
