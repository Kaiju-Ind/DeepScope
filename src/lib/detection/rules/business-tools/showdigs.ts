import type { TechnologyDefinition } from '../../types';

export const showdigsTechnologyDefinition = {
	id: "showdigs",
	name: "Showdigs",
	website: "https://www.showdigs.com",
	description: "Showdigs is an AI-backed leasing automation platform designed to streamline the entire rental funnel.",
	icon: "Showdigs.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "showdigs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.showdigs\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "showdigs:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.showdigs\\.com"),
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
