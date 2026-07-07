import type { TechnologyDefinition } from '../../types';

export const betterUptimeTechnologyDefinition = {
	id: "better-uptime",
	name: "Better Uptime",
	website: "https://betterstack.com/better-uptime",
	description: "Better Uptime is the all-in-one infrastructure monitoring platform for your incident management, uptime monitoring, and status pages.",
	icon: "Better Uptime.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "better-uptime:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/betteruptime\\.com\\/"),
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
