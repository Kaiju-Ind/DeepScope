import type { TechnologyDefinition } from '../../types';

export const jobberbaseTechnologyDefinition = {
	id: "jobberbase",
	name: "JobberBase",
	website: "https://www.jobberbase.com",
	description: "Jobberbase is an open-source job board platform that enables the creation of job sites.",
	icon: "JobberBase.png",
	categories: [
		"widgets-misc",
		"business-tools",
	],
	rules: [
		{
			id: "jobberbase:jsGlobal:0",
			kind: "jsGlobal",
			property: "Jobber",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jobberbase:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Jobberbase", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "jobberbase:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("jobberbase", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:jobberbase:jobberbase:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
