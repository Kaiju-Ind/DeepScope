import type { TechnologyDefinition } from '../../types';

export const pyrocmsTechnologyDefinition = {
	id: "pyrocms",
	name: "PyroCMS",
	website: "https://pyrocms.com",
	description: "PyroCMS is an open-source content management system (CMS) built on the Laravel framework, designed for creating and managing websites with a focus on flexibility, modularity, and ease of use.",
	icon: "PyroCMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pyrocms:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^pyrocms$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "pyrocms:header:1",
			kind: "header",
			key: "X-Streams-Distribution",
			valuePattern: new RegExp("PyroCMS", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "pyrocms:header:2",
			kind: "header",
			key: "x-streams-distribution",
			valuePattern: new RegExp("pyrocms", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:pyrocms:pyrocms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"laravel",
	],
} as const satisfies TechnologyDefinition;
