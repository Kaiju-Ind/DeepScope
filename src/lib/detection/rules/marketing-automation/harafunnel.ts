import type { TechnologyDefinition } from '../../types';

export const harafunnelTechnologyDefinition = {
	id: "harafunnel",
	name: "Harafunnel",
	website: "https://en.harafunnel.com/pages/harafunnel",
	description: "Harafunnel is a marketing automation tool that integrates with Facebook Messenger Bot to streamline customer engagement.",
	icon: "Harafunnel.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "harafunnel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.harafunnel\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "harafunnel:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("assets\\.harafunnel\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
