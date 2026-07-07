import type { TechnologyDefinition } from '../../types';

export const nodepingTechnologyDefinition = {
	id: "nodeping",
	name: "NodePing",
	website: "https://nodeping.com",
	description: "NodePing is a tool in the Website Monitoring category of a tech stack. NodePing is an open source tool with GitHub stars and GitHub forks.",
	icon: "NodePing.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "nodeping:dom:0",
			kind: "dom",
			selector: "footer#poweredbynodeping",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
