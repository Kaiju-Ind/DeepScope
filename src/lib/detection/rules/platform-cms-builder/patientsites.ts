import type { TechnologyDefinition } from '../../types';

export const patientsitesTechnologyDefinition = {
	id: "patientsites",
	name: "PatientSites",
	website: "https://www.patientsites.com",
	description: "PatientSites is a provider of lead generation services and website development for physical therapy practices.",
	icon: "PatientSites.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "patientsites:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.patientsites\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
