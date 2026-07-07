import type { TechnologyDefinition } from '../../types';

export const smashBalloonInstagramFeedTechnologyDefinition = {
	id: "smash-balloon-instagram-feed",
	name: "Smash Balloon Instagram Feed",
	website: "https://smashballoon.com/instagram-feed",
	description: "Instagram Feed displays Instagram posts from your Instagram accounts, either in the same single feed or in multiple different ones. Created by Smash Balloon.",
	icon: "Smash Balloon.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "smash-balloon-instagram-feed:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/instagram-feed\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "smash-balloon-instagram-feed:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/instagram-feed/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
