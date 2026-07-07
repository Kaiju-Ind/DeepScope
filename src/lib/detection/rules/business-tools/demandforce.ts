import type { TechnologyDefinition } from '../../types';

export const demandforceTechnologyDefinition = {
	id: "demandforce",
	name: "Demandforce",
	website: "https://www.demandforce.com",
	description: "Demandforce is an AI-powered patient communication platform that helps healthcare practices attract and retain patients.",
	icon: "Demandforce.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "demandforce:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.demandforce\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "demandforce:dom:1",
			kind: "dom",
			selector: "link[href*='.demandforce.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
