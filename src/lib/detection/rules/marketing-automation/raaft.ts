import type { TechnologyDefinition } from '../../types';

export const raaftTechnologyDefinition = {
	id: "raaft",
	name: "Raaft",
	website: "https://raaft.io",
	description: "Raaft is a tool designed to help SaaS companies lower customer churn and gather feedback from users who choose to cancel their subscriptions.",
	icon: "Raaft.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "raaft:jsGlobal:0",
			kind: "jsGlobal",
			property: "RAAFT_APP_ID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "raaft:jsGlobal:1",
			kind: "jsGlobal",
			property: "raaft",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
