import type { TechnologyDefinition } from '../../types';

export const italiaonlineTechnologyDefinition = {
	id: "italiaonline",
	name: "Italiaonline",
	website: "https://www.italiaonline.it",
	description: "Italiaonline is a web platform that provides tools and services for building and managing websites.",
	icon: "Italiaonline.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "italiaonline:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.italiaonline\\.it"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
