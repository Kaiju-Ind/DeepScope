import type { TechnologyDefinition } from '../../types';

export const perfectbotTechnologyDefinition = {
	id: "perfectbot",
	name: "PerfectBot",
	website: "https://perfectbot.ai",
	description: "PerfectBot is an AI-driven chatbot aimed at optimizing ecommerce customer service.",
	icon: "PerfectBot.svg",
	categories: [
		"platform-cms-builder",
		"email-messaging",
	],
	rules: [
		{
			id: "perfectbot:dom:0",
			kind: "dom",
			selector: "option[value='perfectbot'][data-name='PerfectBot'], a[href*='?bu=perfectbot'][data-cat='perfectbot']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
