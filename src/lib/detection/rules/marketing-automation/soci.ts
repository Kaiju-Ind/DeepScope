import type { TechnologyDefinition } from '../../types';

export const sociTechnologyDefinition = {
	id: "soci",
	name: "SOCi",
	website: "https://www.soci.ai",
	description: "SOCi is an all-in-one platform that unifies workflows, data, and AI to enable automation across business processes.",
	icon: "SOCi.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "soci:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.meetsoci\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
