import type { TechnologyDefinition } from '../../types';

export const patientPrismTechnologyDefinition = {
	id: "patient-prism",
	name: "Patient Prism",
	website: "https://www.patientprism.com",
	description: "Patient Prism is a call tracking and AI-powered coaching platform for dentists, designed to improve practice operations, patient engagement, and overall performance.",
	icon: "PatientPrism.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "patient-prism:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("next-api\\.patientprism\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
