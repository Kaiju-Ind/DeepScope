import type { TechnologyDefinition } from '../../types';

export const wizsoftTechnologyDefinition = {
	id: "wizsoft",
	name: "WizSoft",
	website: "https://www.wizsoft.com",
	description: "WizSoft is a search engine designed for embedding in ecommerce websites and other platforms where data are stored in records.",
	categories: [
		"search",
	],
	rules: [
		{
			id: "wizsoft:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.wizsoft\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
