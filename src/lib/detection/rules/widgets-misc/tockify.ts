import type { TechnologyDefinition } from '../../types';

export const tockifyTechnologyDefinition = {
	id: "tockify",
	name: "Tockify",
	website: "https://tockify.com",
	description: "Tockify is a customizable web calendar platform designed for embedding interactive event calendars into websites.",
	icon: "Tockify.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "tockify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("public\\.tockify\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
