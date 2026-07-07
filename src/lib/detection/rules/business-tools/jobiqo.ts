import type { TechnologyDefinition } from '../../types';

export const jobiqoTechnologyDefinition = {
	id: "jobiqo",
	name: "Jobiqo",
	website: "https://www.jobiqo.com",
	description: "Jobiqo is a job board platform that enables publishers to expand reach and increase recruitment advertising revenue.",
	icon: "Jobiqo.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "jobiqo:meta:0",
			kind: "meta",
			key: "owner",
			valuePattern: new RegExp("^Jobiqo$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "jobiqo:meta:1",
			kind: "meta",
			key: "owner",
			valuePattern: new RegExp("^jobiqo$", "i"),
			description: "Meta tag matches a known technology marker.",
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
