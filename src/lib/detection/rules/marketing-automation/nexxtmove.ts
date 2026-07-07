import type { TechnologyDefinition } from '../../types';

export const nexxtmoveTechnologyDefinition = {
	id: "nexxtmove",
	name: "Nexxtmove",
	website: "https://nexxtmove.nl",
	description: "Nexxtmove is a marketing platform for real estate agencies that provides targeted, personalized communication tools designed to reach the appropriate audience and support improved campaign outcomes.",
	icon: "Nexxtmove.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "nexxtmove:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("nexxtmove-313510\\.web\\.app"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
