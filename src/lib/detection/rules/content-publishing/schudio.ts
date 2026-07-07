import type { TechnologyDefinition } from '../../types';

export const schudioTechnologyDefinition = {
	id: "schudio",
	name: "Schudio",
	website: "https://www.schudio.com",
	description: "Schudio is a provider of school website software and tracking tools, offering custom analytics solutions for educational institutions.",
	icon: "Schudio.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "schudio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.schudio\\.app"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
