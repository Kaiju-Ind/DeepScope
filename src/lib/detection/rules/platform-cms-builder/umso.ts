import type { TechnologyDefinition } from '../../types';

export const umsoTechnologyDefinition = {
	id: "umso",
	name: "Umso",
	website: "https://www.umso.com",
	description: "Umso is a website builder for Startups.",
	icon: "Umso.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "umso:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("isPriorBlockingEnabled"),
			confidence: 75,
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "umso:dom:1",
			kind: "dom",
			selector: "link[href*='.umso.co/'], img[src*='.umso.co/'], video[poster*='.umso.co/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "umso:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("ispriorblockingenabled"),
			confidence: 75,
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
