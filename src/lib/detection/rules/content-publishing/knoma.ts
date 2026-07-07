import type { TechnologyDefinition } from '../../types';

export const knomaTechnologyDefinition = {
	id: "knoma",
	name: "Knoma",
	website: "https://www.knoma.io",
	description: "Knoma is a platform where users can search hundreds of courses from leading schools and bootcamps.",
	icon: "Knoma.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "knoma:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.knoma\\.io\\/"),
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
