import type { TechnologyDefinition } from '../../types';

export const motiveTechnologyDefinition = {
	id: "motive",
	name: "Motive",
	website: "https://motivehq.com",
	description: "Motive is an all-in-one website platform designed to create and manage online presence for the automotive industry.",
	icon: "Motive.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "motive:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.app\\.ridemotive\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
