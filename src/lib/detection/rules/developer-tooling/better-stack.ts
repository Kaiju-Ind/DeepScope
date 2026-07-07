import type { TechnologyDefinition } from '../../types';

export const betterStackTechnologyDefinition = {
	id: "better-stack",
	name: "Better Stack",
	website: "https://betterstack.com/uptime",
	description: "Better Stack is the all-in-one infrastructure monitoring platform for your incident management, uptime monitoring, and status pages.",
	icon: "Better Stack.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "better-stack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/(?:uptime\\.)?(?:betteruptime|betterstack)\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
