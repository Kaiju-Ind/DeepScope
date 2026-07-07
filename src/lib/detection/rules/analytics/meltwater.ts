import type { TechnologyDefinition } from '../../types';

export const meltwaterTechnologyDefinition = {
	id: "meltwater",
	name: "Meltwater",
	website: "https://www.meltwater.com",
	description: "Meltwater is a media monitoring platform that tracks, analyzes, and provides insights from online news, social media, and broadcast sources to support data-driven decision-making.",
	icon: "Meltwater.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "meltwater:dom:0",
			kind: "dom",
			selector: "iframe[src*='app.meltwater.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "meltwater:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.meltwater\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "meltwater:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.meltwater\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
