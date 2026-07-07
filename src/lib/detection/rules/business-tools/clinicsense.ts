import type { TechnologyDefinition } from '../../types';

export const clinicsenseTechnologyDefinition = {
	id: "clinicsense",
	name: "ClinicSense",
	website: "https://clinicsense.com",
	description: "ClinicSense is a practice management software solution that reduces administrative costs and workload in healthcare clinics.",
	icon: "ClinicSense.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "clinicsense:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.clinicsense\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
