import type { TechnologyDefinition } from '../../types';

export const mastodonTechnologyDefinition = {
	id: "mastodon",
	name: "Mastodon",
	website: "https://joinmastodon.org",
	description: "Mastodon is a free and open-source self-hosted social networking service.",
	icon: "Mastodon.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "mastodon:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^_mastodon_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "mastodon:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Mastodon$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mastodon:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^mastodon$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:joinmastodon:mastodon:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
