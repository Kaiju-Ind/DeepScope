import type { TechnologyDefinition } from '../../types';

export const solvemateTechnologyDefinition = {
	id: "solvemate",
	name: "Solvemate",
	website: "https://www.solvemate.com",
	description: "Solvemate is a customer service automation platform that enables brands to deliver quality customer service through meaningful conversations via chatbots.",
	icon: "Solvemate.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "solvemate:dom:0",
			kind: "dom",
			selector: "link[href*='.solvemate.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "solvemate:jsGlobal:1",
			kind: "jsGlobal",
			property: "solvemate.config.solvemateCDN",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "solvemate:jsGlobal:2",
			kind: "jsGlobal",
			property: "solvemateCli",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "solvemate:jsGlobal:3",
			kind: "jsGlobal",
			property: "solvemateConfig",
			description: "Page-owned global matches a known technology marker.",
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
