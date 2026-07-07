import type { TechnologyDefinition } from '../../types';

export const betterClickToTweetTechnologyDefinition = {
	id: "better-click-to-tweet",
	name: "Better Click To Tweet",
	website: "https://wordpress.org/plugins/better-click-to-tweet/",
	description: "Adds click to tweet boxes into your posts.",
	icon: "Better Click To Tweet.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "better-click-to-tweet:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/better-click-to-tweet/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
