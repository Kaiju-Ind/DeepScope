import type { TechnologyDefinition } from '../../types';

export const sirvTechnologyDefinition = {
	id: "sirv",
	name: "Sirv",
	website: "https://sirv.com",
	description: "Sirv is a solution for serving images, offering easy management, manipulation, and delivery.",
	icon: "Sirv.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "sirv:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("scripts\\.sirv\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
