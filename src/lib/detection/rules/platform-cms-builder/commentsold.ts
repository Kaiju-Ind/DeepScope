import type { TechnologyDefinition } from '../../types';

export const commentsoldTechnologyDefinition = {
	id: "commentsold",
	name: "CommentSold",
	website: "https://try.commentsold.com",
	description: "CommentSold is a platform that converts social media comments into sales by enabling automated purchase processing.",
	icon: "CommentSold.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "commentsold:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("s3\\.commentsold\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
