import type { TechnologyDefinition } from '../../types';

export const yoastDuplicatePostTechnologyDefinition = {
	id: "yoast-duplicate-post",
	name: "Yoast Duplicate Post",
	website: "https://wordpress.org/plugins/duplicate-post",
	description: "Yoast Duplicate Post is a WordPress plugin which allows users to clone posts of any type, or copy them to new drafts for further editing.",
	icon: "Yoast SEO.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "yoast-duplicate-post:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/duplicate-post/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
