import type { TechnologyDefinition } from '../../types';

export const feedmagnetTechnologyDefinition = {
	id: "feedmagnet",
	name: "FeedMagnet",
	website: "https://www.feedmagnet.com",
	description: "FeedMagnet is a platform that merges original content with curated third-party articles and social posts to deliver varied brand experiences.",
	icon: "FeedMagnet.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "feedmagnet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.feedmagnet\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
