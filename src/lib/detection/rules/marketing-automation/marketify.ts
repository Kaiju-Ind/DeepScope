import type { TechnologyDefinition } from '../../types';

export const marketifyTechnologyDefinition = {
	id: "marketify",
	name: "Marketify",
	website: "https://marketify.co",
	description: "Marketify is an app designed to engage audiences, expand email lists, and increase conversion rates.",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "marketify:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.marketify\\.co"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
