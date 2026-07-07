import type { TechnologyDefinition } from '../../types';

export const highermeHrTechnologyDefinition = {
	id: "higherme-hr",
	name: "HigherMe HR",
	website: "https://higherme.com/products/hr-software",
	description: "HigherMe HR is a hiring software platform designed for hourly workforces, supporting job postings, applicant screening, interview scheduling, and onboarding workflows.",
	icon: "HigherMe.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "higherme-hr:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.higherme\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
