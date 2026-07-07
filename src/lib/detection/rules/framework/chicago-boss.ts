import type { TechnologyDefinition } from '../../types';

export const chicagoBossTechnologyDefinition = {
	id: "chicago-boss",
	name: "Chicago Boss",
	website: "https://github.com/ChicagoBoss/ChicagoBoss",
	description: "Chicago Boss is a web framework for Erlang.",
	icon: "Chicago Boss.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "chicago-boss:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^_boss_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "chicago-boss:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^book_like_a_boss_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"erlang",
	],
} as const satisfies TechnologyDefinition;
