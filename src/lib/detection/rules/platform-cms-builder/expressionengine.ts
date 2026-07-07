import type { TechnologyDefinition } from '../../types';

export const expressionengineTechnologyDefinition = {
	id: "expressionengine",
	name: "ExpressionEngine",
	website: "https://expressionengine.com/",
	description: "ExpressionEngine is a free and open-source CMS.",
	icon: "ExpressionEngine.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "expressionengine:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^exp_csrf_token$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "expressionengine:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^exp_last_activity$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "expressionengine:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^exp_tracker$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:ellislab:expressionengine:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
