import type { TechnologyDefinition } from '../../types';

export const gongTechnologyDefinition = {
	id: "gong",
	name: "Gong",
	website: "https://www.gong.io",
	description: "Gong is an AI-powered platform that captures and analyses customer interactions to provide insights for revenue teams, improving forecasting accuracy and sales performance.",
	icon: "Gong.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "gong:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("app\\.gong\\.io", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "gong:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("app\\.gong\\.io", "i"),
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
