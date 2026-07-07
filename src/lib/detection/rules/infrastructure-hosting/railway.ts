import type { TechnologyDefinition } from '../../types';

export const railwayTechnologyDefinition = {
	id: "railway",
	name: "Railway",
	website: "https://railway.app",
	description: "Railway is a cloud platform that simplifies building, deploying, and managing applications with easy setup and scalable infrastructure.",
	icon: "Railway.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "railway:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("railway\\.app"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "railway:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^railway$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "railway:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^railway$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
