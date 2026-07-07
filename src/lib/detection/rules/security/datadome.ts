import type { TechnologyDefinition } from '../../types';

export const datadomeTechnologyDefinition = {
	id: "datadome",
	name: "DataDome",
	website: "https://datadome.co/",
	description: "DataDome is a cybersecurity platform that specialises in bot protection and mitigation, offering advanced solutions to safeguard websites and mobile applications against malicious bot traffic, credential stuffing, scraping, and other automated threats.",
	icon: "datadome.png",
	categories: [
		"security",
	],
	rules: [
		{
			id: "datadome:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https:\\/\\/ct\\.datadome\\.co\\/[a-z]\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "datadome:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^datadome$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "datadome:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^datadome\\-_zldp$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "datadome:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^datadome\\-_zldt$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "datadome:header:4",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^DataDome$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "datadome:header:5",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^datadome$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
