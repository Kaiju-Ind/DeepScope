import type { TechnologyDefinition } from '../../types';

export const kivaTechnologyDefinition = {
	id: "kiva",
	name: "Kiva",
	website: "https://www.kiva.org",
	description: "Kiva is a charity organization that connects individuals through micro-lending to help alleviate poverty.",
	icon: "Kiva.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "kiva:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.kiva\\.org"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
