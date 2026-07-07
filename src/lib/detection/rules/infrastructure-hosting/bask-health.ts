import type { TechnologyDefinition } from '../../types';

export const baskHealthTechnologyDefinition = {
	id: "bask-health",
	name: "Bask Health",
	website: "https://bask.health",
	description: "Bask Health is a telehealth platform that enables the creation of custom digital health solutions for virtual care delivery and patient engagement.",
	icon: "BaskHealth.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "bask-health:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.bask\\.health"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
