import type { TechnologyDefinition } from '../../types';

export const uptimerobotTechnologyDefinition = {
	id: "uptimerobot",
	name: "UptimeRobot",
	website: "https://uptimerobot.com",
	description: "UptimeRobot is a web-based software that is designed to monitor the sites frequently to check whether any site is down owing to server problem or any bug in coding.",
	icon: "UptimeRobot.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "uptimerobot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.uptimerobot\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "uptimerobot:dom:1",
			kind: "dom",
			selector: "a[href*='uptimerobot.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "uptimerobot:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.uptimerobot\\.com", "i"),
			description: "Response header matches a known technology marker.",
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
