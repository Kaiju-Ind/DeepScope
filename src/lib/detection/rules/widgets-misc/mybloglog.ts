import type { TechnologyDefinition } from '../../types';

export const mybloglogTechnologyDefinition = {
	id: "mybloglog",
	name: "MyBlogLog",
	website: "https://www.mybloglog.com",
	icon: "MyBlogLog.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "mybloglog:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pub\\.mybloglog\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
