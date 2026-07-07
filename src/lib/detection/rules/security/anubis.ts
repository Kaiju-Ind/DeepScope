import type { TechnologyDefinition } from '../../types';

export const anubisTechnologyDefinition = {
	id: "anubis",
	name: "Anubis",
	website: "https://anubis.techaro.lol",
	description: "Anubis is a system that evaluates the characteristics of incoming HTTP requests to determine their legitimacy and enhance website protection.",
	icon: "Anubis.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "anubis:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^techaro\\.lol\\-anubis\\-auth$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "anubis:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^techaro\\.lol\\-anubis\\-cookie\\-verification$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
