import type { TechnologyDefinition } from '../../types';

export const mynewtermTechnologyDefinition = {
	id: "mynewterm",
	name: "MyNewTerm",
	website: "https://mynewterm.com",
	description: "MyNewTerm is a directory of teaching and education job vacancies across schools, colleges, and training institutions.",
	icon: "MyNewTerm.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "mynewterm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.mynewterm\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
