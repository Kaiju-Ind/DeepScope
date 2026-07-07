import type { TechnologyDefinition } from '../../types';

export const evermosTechnologyDefinition = {
	id: "evermos",
	name: "Evermos",
	website: "https://evermos.com",
	description: "Evermos is a connected commerce platform that enables resellers and drop shippers to earn commissions.",
	icon: "Evermos.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "evermos:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("assets\\.evermos\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
