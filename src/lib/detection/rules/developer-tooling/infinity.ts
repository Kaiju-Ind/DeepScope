import type { TechnologyDefinition } from '../../types';

export const infinityTechnologyDefinition = {
	id: "infinity",
	name: "Infinity",
	website: "https://startinfinity.com",
	description: "Infinity is an all-in-one workspace that allows project organization, task tracking, and team collaboration in a centralized platform.",
	icon: "Infinity.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "infinity:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.startinfinity\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "infinity:dom:1",
			kind: "dom",
			selector: "iframe[src*='app.startinfinity.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
