import type { TechnologyDefinition } from '../../types';

export const mydrycleanerTechnologyDefinition = {
	id: "mydrycleaner",
	name: "MyDryCleaner",
	website: "https://mydrycleaner.com",
	description: "MyDryCleaner is a dry cleaning management solution that streamlines operations for dry cleaning businesses.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mydrycleaner:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("reviews\\.reviewmydrycleaner\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
