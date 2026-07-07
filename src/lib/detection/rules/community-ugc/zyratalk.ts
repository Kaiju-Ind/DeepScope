import type { TechnologyDefinition } from '../../types';

export const zyratalkTechnologyDefinition = {
	id: "zyratalk",
	name: "Zyratalk",
	website: "https://www.zyratalk.com",
	description: "Zyratalk is a tool for handling customer conversations and managing reviews to support organized feedback tracking.",
	icon: "Zyratalk.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "zyratalk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.zyratalk\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
