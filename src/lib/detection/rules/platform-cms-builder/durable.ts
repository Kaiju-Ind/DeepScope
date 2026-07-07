import type { TechnologyDefinition } from '../../types';

export const durableTechnologyDefinition = {
	id: "durable",
	name: "Durable",
	website: "https://durable.co",
	description: "Durable is an AI-powered tool that automatically builds websites, streamlining the creation process with minimal user input.",
	icon: "Durable.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "durable:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.durable\\.co"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
