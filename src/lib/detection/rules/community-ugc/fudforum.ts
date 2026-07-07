import type { TechnologyDefinition } from '../../types';

export const fudforumTechnologyDefinition = {
	id: "fudforum",
	name: "FUDforum",
	website: "https://github.com/fudforum/FUDforum",
	description: "FUDforum is a discussion forum software with support for posts, topics, polls and attachments.",
	icon: "default.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "fudforum:jsGlobal:0",
			kind: "jsGlobal",
			property: "fud_msg_focus",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fudforum:jsGlobal:1",
			kind: "jsGlobal",
			property: "fud_tree_msg_focus",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:fudforum:fudforum:*:*:*:*:*:*:*:*",
	},
	implies: [
		"perl",
		"php",
	],
} as const satisfies TechnologyDefinition;
