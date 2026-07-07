import type { TechnologyDefinition } from '../../types';

export const assembleTechnologyDefinition = {
	id: "assemble",
	name: "Assemble",
	website: "https://assemble.me",
	description: "Assemble is a website builder designed for creating and managing film-related websites.",
	icon: "Assemble.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "assemble:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.assemble\\.me"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
