import type { TechnologyDefinition } from '../../types';

export const intensedebateTechnologyDefinition = {
	id: "intensedebate",
	name: "IntenseDebate",
	website: "https://intensedebate.com",
	description: "IntenseDebate is a blog commenting system that supports Typepad, Blogger and Wordpress blogs. The system allows blog owners to track and moderate comments from one place with features like threading, comment analytics, user reputation, and comment aggregation.",
	icon: "IntenseDebate.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "intensedebate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("intensedebate\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
