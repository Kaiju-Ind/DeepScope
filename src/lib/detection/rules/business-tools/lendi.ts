import type { TechnologyDefinition } from '../../types';

export const lendiTechnologyDefinition = {
	id: "lendi",
	name: "Lendi",
	website: "https://www.lendi.pl",
	description: "Lendi is a Poland-based provider of loan system solutions designed to support financial operations and lending processes.",
	icon: "Lendi.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "lendi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.lendi\\.pl"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lendi:header:1",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("www\\.lendi\\.pl", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "lendi:header:2",
			kind: "header",
			key: "access-control-allow-origin",
			valuePattern: new RegExp("www\\.lendi\\.pl", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
