import type { TechnologyDefinition } from '../../types';

export const scapbotTechnologyDefinition = {
	id: "scapbot",
	name: "ScapBot",
	website: "https://scapbot.com",
	description: "ScapBot is a tool designed to automate tasks and workflows, helping streamline repetitive processes across various work environments.",
	icon: "ScapBot.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "scapbot:dom:0",
			kind: "dom",
			selector: "script[data-host*='analytics.scapbot.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
