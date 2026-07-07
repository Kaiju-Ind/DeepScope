import type { TechnologyDefinition } from '../../types';

export const nepsoTechnologyDefinition = {
	id: "nepso",
	name: "Nepso",
	website: "https://www.nepso.com",
	icon: "nepso.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "nepso:header:0",
			kind: "header",
			key: "X-Powered-CMS",
			valuePattern: new RegExp("Nepso", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "nepso:header:1",
			kind: "header",
			key: "x-powered-cms",
			valuePattern: new RegExp("nepso", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
