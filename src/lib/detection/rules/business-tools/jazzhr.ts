import type { TechnologyDefinition } from '../../types';

export const jazzhrTechnologyDefinition = {
	id: "jazzhr",
	name: "JazzHR",
	website: "https://www.jazzhr.com",
	description: "JazzHR is SaaS recruiting software to source talent, conduct interviews and hires.",
	icon: "JazzHR.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "jazzhr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.jazz\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jazzhr:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("JazzHR"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "jazzhr:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("jazzhr"),
			description: "Script content contains a bounded technology signature.",
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
