import type { TechnologyDefinition } from '../../types';

export const philomenaTechnologyDefinition = {
	id: "philomena",
	name: "Philomena",
	website: "https://github.com/derpibooru/philomena",
	description: "Philomena is an imageboard software.",
	icon: "Philomena.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "philomena:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^philomena$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"elixir",
		"erlang",
	],
} as const satisfies TechnologyDefinition;
