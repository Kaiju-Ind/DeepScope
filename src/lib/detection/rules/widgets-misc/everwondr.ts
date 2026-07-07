import type { TechnologyDefinition } from '../../types';

export const everwondrTechnologyDefinition = {
	id: "everwondr",
	name: "EverWondr",
	website: "https://everwondr.com",
	description: "EverWondr is a network providing a collection of plug-ins, including a calendar, directory, blog, guestbook, gallery, and survey.",
	icon: "EverWondr.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "everwondr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.everwondr\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "everwondr:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("api\\.everwondr\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
