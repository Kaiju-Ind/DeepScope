import type { TechnologyDefinition } from '../../types';

export const pipedriveTechnologyDefinition = {
	id: "pipedrive",
	name: "Pipedrive",
	website: "https://www.pipedrive.com/",
	description: "Pipedrive is a cloud-based sales CRM.",
	icon: "Pipedrive.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "pipedrive:jsGlobal:0",
			kind: "jsGlobal",
			property: "LeadBooster",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
		],
	},
} as const satisfies TechnologyDefinition;
