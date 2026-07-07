import type { TechnologyDefinition } from '../../types';

export const ecbbTechnologyDefinition = {
	id: "ecbb",
	name: "ECBB",
	website: "https://ecbb.jp",
	description: "ECBB is a Japan-based platform providing data analytics and business intelligence solutions.",
	icon: "ECBB.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "ecbb:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ecbb\\.jp\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
