import type { TechnologyDefinition } from '../../types';

export const apruvdTechnologyDefinition = {
	id: "apruvd",
	name: "Apruvd",
	website: "https://apruvd.com",
	description: "Apruvd is a fraud protection system designed to detect and prevent unauthorized or suspicious transactions.",
	icon: "Apruvd.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "apruvd:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.apruvd\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
