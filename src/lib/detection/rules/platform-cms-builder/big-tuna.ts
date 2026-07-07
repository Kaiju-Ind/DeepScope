import type { TechnologyDefinition } from '../../types';

export const bigTunaTechnologyDefinition = {
	id: "big-tuna",
	name: "Big Tuna",
	website: "https://bigtuna.com",
	description: "Big Tuna is a website platform designed to help small businesses create, manage, and maintain an online presence through integrated site-building and content management tools.",
	icon: "BigTuna.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "big-tuna:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("staging\\.bigtuna\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
