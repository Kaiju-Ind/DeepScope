import type { TechnologyDefinition } from '../../types';

export const agorizeTechnologyDefinition = {
	id: "agorize",
	name: "Agorize",
	website: "https://www.agorize.com",
	description: "Agorize is a platform that enables businesses to identify and connect with talent through innovation challenges and collaborative programs.",
	icon: "Agorize.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "agorize:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.fs\\.agorize\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
