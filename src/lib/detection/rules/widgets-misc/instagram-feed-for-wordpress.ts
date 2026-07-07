import type { TechnologyDefinition } from '../../types';

export const instagramFeedForWordpressTechnologyDefinition = {
	id: "instagram-feed-for-wordpress",
	name: "Instagram Feed for WordPress",
	website: "https://wordpress.org/plugins/instagram-feed/",
	description: "Display Instagram photos from any non-private Instagram accounts.",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "instagram-feed-for-wordpress:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("instagram-feed(?:\\/js)?(?:\\/sbi-scripts)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "instagram-feed-for-wordpress:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/instagram-feed'], a[data-full-res*='/wp-content/uploads/sb-instagram-feed-images/'], img[src*='/wp-content/uploads/sb-instagram-feed-images/'], img[src*='/wp-content/plugins/instagram-feed/'], img[data-src*='/wp-content/uploads/sb-instagram-feed-images/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"low",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
