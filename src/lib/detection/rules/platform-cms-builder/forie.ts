import type { TechnologyDefinition } from '../../types';

export const forieTechnologyDefinition = {
	id: "forie",
	name: "Forie",
	website: "https://www.forie.com/",
	description: "Forie is a B2B marketplace software designed to facilitate business-to-business transactions by connecting suppliers and buyers.",
	icon: "Forie.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "forie:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.forie\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
