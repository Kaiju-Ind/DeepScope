import type { TechnologyDefinition } from '../../types';

export const operooTechnologyDefinition = {
	id: "operoo",
	name: "Operoo",
	website: "https://operoo.com",
	description: "Operoo is a school workflow platform that supports administrative processes and communication management within educational institutions.",
	icon: "Operoo.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "operoo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.operoo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
