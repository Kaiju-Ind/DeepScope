import type { TechnologyDefinition } from '../../types';

export const enterpriseBotTechnologyDefinition = {
	id: "enterprise-bot",
	name: "Enterprise Bot",
	website: "https://www.enterprisebot.ai",
	description: "Enterprise Bot specializes in developing and deploying complex conversational AI systems tailored for enterprise settings, leveraging natural language processing, machine learning, and automation to improve customer interactions and streamline operations.",
	icon: "Enterprise Bot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "enterprise-bot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.enterprisebot\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
