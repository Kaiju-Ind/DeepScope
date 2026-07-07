import type { TechnologyDefinition } from '../../types';

export const redriveTechnologyDefinition = {
	id: "redrive",
	name: "Redrive",
	website: "https://redrive.com.br",
	description: "Redrive is a sales platform for WhatsApp that provides automation tools to help companies increase sales through the messaging app.",
	icon: "Redrive.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "redrive:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.redrive\\.com\\.br"),
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
