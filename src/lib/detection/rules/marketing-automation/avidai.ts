import type { TechnologyDefinition } from '../../types';

export const avidaiTechnologyDefinition = {
	id: "avidai",
	name: "AvidAI",
	website: "https://www.getavid.ai",
	description: "AvidAI is a marketing platform that uses artificial intelligence to convert digital window-shoppers through automated campaigns, A/B testing, and personalized content optimization.",
	icon: "AvidAI.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "avidai:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.getavid\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
