import type { TechnologyDefinition } from '../../types';

export const realistTechnologyDefinition = {
	id: "realist",
	name: "Realist",
	website: "https://www.realist.gen.tr",
	description: "Realist is a website tracker and link exchange platform designed to monitor site activity and facilitate reciprocal linking between domains.",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "realist:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.realist\\.gen\\.tr"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
