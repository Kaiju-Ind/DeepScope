import type { TechnologyDefinition } from '../../types';

export const forumbeeTechnologyDefinition = {
	id: "forumbee",
	name: "Forumbee",
	website: "https://forumbee.com",
	description: "Forumbee is a platform for hosting community Q&A spaces and discussion forums, providing organized threads for information exchange and user-driven support.",
	icon: "Forumbee.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "forumbee:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.forumbee\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
