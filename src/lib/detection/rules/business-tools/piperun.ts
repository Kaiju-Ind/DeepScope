import type { TechnologyDefinition } from '../../types';

export const piperunTechnologyDefinition = {
	id: "piperun",
	name: "Piperun",
	website: "https://crmpiperun.com",
	description: "Piperun is a CRM designed to automate and enhance sales performance for companies managing complex sales processes and channel partnerships.",
	icon: "Piperun.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "piperun:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.crmpiperun\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "piperun:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("app\\.pipe\\.run\\/"),
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
