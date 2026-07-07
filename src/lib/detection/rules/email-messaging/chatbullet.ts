import type { TechnologyDefinition } from '../../types';

export const chatbulletTechnologyDefinition = {
	id: "chatbullet",
	name: "ChatBullet",
	website: "https://chatbullet.com",
	description: "ChatBullet is a platform that integrates chatbots and AI tools to automate customer interactions.",
	icon: "ChatBullet.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatbullet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.chatbullet\\.com"),
			description: "Script source URL matches a known technology marker.",
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
