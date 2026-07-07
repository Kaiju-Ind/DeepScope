import type { TechnologyDefinition } from '../../types';

export const agoraTechnologyDefinition = {
	id: "agora",
	name: "Agora",
	website: "https://www.agora.io",
	description: "Agora is a real-time engagement platform that provides infrastructure for interactive communication across applications.",
	icon: "Agora.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "agora:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.agora\\.io", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "agora:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.agora\\.io", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
