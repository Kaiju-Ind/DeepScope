import type { TechnologyDefinition } from '../../types';

export const aarkiTechnologyDefinition = {
	id: "aarki",
	name: "Aarki",
	website: "https://www.aarki.com",
	description: "Aarki is an AI platform that develops advertising solutions aimed at increasing mobile revenue growth.",
	icon: "Aarki.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "aarki:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.aarki\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
