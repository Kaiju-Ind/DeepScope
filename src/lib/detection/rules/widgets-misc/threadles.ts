import type { TechnologyDefinition } from '../../types';

export const threadlesTechnologyDefinition = {
	id: "threadles",
	name: "Threadles",
	website: "https://threadles.net",
	description: "Threadles is a social networking platform that uses advanced AI-driven algorithms to enhance digital interaction.",
	icon: "Threadles.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "threadles:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("web\\.threadles\\.net\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "threadles:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Threadles$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "threadles:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^threadles$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
