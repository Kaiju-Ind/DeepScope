import type { TechnologyDefinition } from '../../types';

export const ezyvetTechnologyDefinition = {
	id: "ezyvet",
	name: "ezyVet",
	website: "https://www.ezyvet.com",
	description: "ezyVet is a cloud-based veterinary practice management platform designed to support clinical workflows, patient records, scheduling, and operational processes.",
	icon: "ezyVet.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "ezyvet:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.ezyvet\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
