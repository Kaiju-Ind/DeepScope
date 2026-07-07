import type { TechnologyDefinition } from '../../types';

export const ventryshieldTechnologyDefinition = {
	id: "ventryshield",
	name: "VentryShield",
	website: "https://ventryshield.net",
	description: "VentryShield offers DDoS Protected VPS and Web Hosting.",
	icon: "ventry_shield.png",
	categories: [
		"security",
	],
	rules: [
		{
			id: "ventryshield:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^ventryshield_pre$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "ventryshield:header:1",
			kind: "header",
			key: "x-ventryshield-cache-status",
			valuePattern: new RegExp("no-cache", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
