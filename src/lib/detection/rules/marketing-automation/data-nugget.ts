import type { TechnologyDefinition } from '../../types';

export const dataNuggetTechnologyDefinition = {
	id: "data-nugget",
	name: "data nugget",
	website: "https://datanugget.io",
	description: "data nugget is a brand growth platform designed to help businesses analyze performance, identify opportunities, and manage strategies.",
	icon: "DataNugget.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "data-nugget:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.datanugget\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
