import type { TechnologyDefinition } from '../../types';

export const mypersonasTechnologyDefinition = {
	id: "mypersonas",
	name: "MyPersonas",
	website: "https://mypersonas.ai",
	description: "MyPersonas is an AI-powered platform that creates digital replicas of key employees to handle repetitive, routine inquiries, reducing interruptions and streamlining access to internal knowledge.",
	icon: "MyPersonas.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "mypersonas:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.mypersonas\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
