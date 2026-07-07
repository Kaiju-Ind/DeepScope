import type { TechnologyDefinition } from '../../types';

export const osticketTechnologyDefinition = {
	id: "osticket",
	name: "osTicket",
	website: "https://osticket.com",
	description: "osTicket is an open-source support ticket system that allows businesses to manage and streamline customer support requests through a centralized platform, including features for ticket tracking, automation, and reporting.",
	icon: "osTicket.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "osticket:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^OSTSESSID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "osticket:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^ostsessid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:enhancesoft:osticket:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
