import type { TechnologyDefinition } from '../../types';

export const patientloopTechnologyDefinition = {
	id: "patientloop",
	name: "PatientLoop",
	website: "https://www.patientloop.com",
	description: "PatientLoop is a software platform that helps organizations measure, demonstrate, and report the return on investment of their services to clients, supporting scalable performance tracking and impact analysis.",
	icon: "PatientLoop.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "patientloop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.patientloop\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
