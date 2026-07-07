import type { TechnologyDefinition } from '../../types';

export const lexityTechnologyDefinition = {
	id: "lexity",
	name: "Lexity",
	website: "https://lexity.com",
	description: "Lexity is the one-stop-shop of ecommerce services for SMBs.",
	icon: "Lexity.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "lexity:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.lexity\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
