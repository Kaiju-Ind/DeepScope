import type { TechnologyDefinition } from '../../types';

export const customTwitterFeedsTechnologyDefinition = {
	id: "custom-twitter-feeds",
	name: "Custom Twitter Feeds",
	website: "https://wordpress.org/plugins/custom-twitter-feeds",
	description: "Custom Twitter Feeds for Wordpress.",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "custom-twitter-feeds:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("custom-twitter-feeds(?:\\/js)?(?:\\/ctf-scripts)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "custom-twitter-feeds:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/custom-twitter-feeds/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
