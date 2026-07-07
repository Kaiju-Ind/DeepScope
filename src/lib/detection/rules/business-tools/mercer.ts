import type { TechnologyDefinition } from '../../types';

export const mercerTechnologyDefinition = {
	id: "mercer",
	name: "Mercer",
	website: "https://www.mercer.com",
	description: "Mercer is a platform that supports companies in transforming talent, health, retirement, and investment strategies to enhance overall performance and outcomes.",
	icon: "Mercer.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "mercer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("career-analytics\\.mercer\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
