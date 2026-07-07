import type { TechnologyDefinition } from '../../types';

export const responsaTechnologyDefinition = {
	id: "responsa",
	name: "Responsa",
	website: "https://responsa.ai",
	description: "Responsa is a conversational AI platform designed to increase sales and reduce operational costs by automating customer interactions and streamlining communication processes.",
	icon: "Responsa.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "responsa:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\/\\/goresponsa\\.com\\/"),
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
