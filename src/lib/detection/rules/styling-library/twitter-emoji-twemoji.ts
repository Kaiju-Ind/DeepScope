import type { TechnologyDefinition } from '../../types';

export const twitterEmojiTwemojiTechnologyDefinition = {
	id: "twitter-emoji-twemoji",
	name: "Twitter Emoji (Twemoji)",
	website: "https://twitter.github.io/twemoji/",
	description: "Twitter Emoji is a set of open-source emoticons and emojis for Twitter, TweetDeck, and also for Android and iOS versions of the application.",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "twitter-emoji-twemoji:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("twemoji(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twitter-emoji-twemoji:jsGlobal:1",
			kind: "jsGlobal",
			property: "twemoji",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "twitter-emoji-twemoji:jsGlobal:2",
			kind: "jsGlobal",
			property: "twemoji.base",
			valuePattern: new RegExp("twemoji\\.maxcdn\\.com\\/v\\/([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
