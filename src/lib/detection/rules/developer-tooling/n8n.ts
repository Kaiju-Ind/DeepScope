import type { TechnologyDefinition } from '../../types';

export const n8nTechnologyDefinition = {
	id: "n8n",
	name: "n8n",
	website: "https://n8n.io",
	description: "n8n is a source-available workflow automation tool that allows you to connect various services and build automated workflows with a visual node-based editor.",
	icon: "n8n.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "n8n:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("N8N_DEBOUNCE_MULTIPLIER"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "n8n:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("N8N_PASSWORD_MIN_LENGTH"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "n8n:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^n8n\\-auth$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"recurring",
		],
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
