import type { TechnologyDefinition } from '../../types';

export const combahtonFlowshieldTechnologyDefinition = {
	id: "combahton-flowshield",
	name: "Combahton FlowShield",
	website: "https://combahton.net",
	description: "Combahton FlowShield is a network security solution designed to protect networks and servers from various cyber threats, including DDoS attacks, malware, and other types of malicious traffic.",
	icon: "Combahton.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "combahton-flowshield:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^FLOWPROXY\\-ORIGIN$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "combahton-flowshield:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("antiddos\\/flowproxy", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "combahton-flowshield:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^flowproxy\\-origin$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "combahton-flowshield:header:3",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("antiddos\\/flowproxy", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
