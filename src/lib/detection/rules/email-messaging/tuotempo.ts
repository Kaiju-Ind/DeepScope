import type { TechnologyDefinition } from '../../types';

export const tuotempoTechnologyDefinition = {
	id: "tuotempo",
	name: "TuoTempo",
	website: "https://tuotempo.com",
	description: "TuoTempo is a patient CRM designed to manage appointments, patient communications, and care workflows for medical centers.",
	icon: "TuoTempo.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "tuotempo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.tuotempo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
