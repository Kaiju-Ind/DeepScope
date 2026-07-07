import type { TechnologyDefinition } from '../../types';

export const reniwnTechnologyDefinition = {
	id: "reniwn",
	name: "Reniwn",
	website: "http://myreniwn.com",
	description: "Reniwn is a website builder that enables the creation of professional-looking websites through customizable design and publishing tools.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "reniwn:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.myreniwn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
