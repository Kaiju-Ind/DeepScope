import type { TechnologyDefinition } from '../../types';

export const powerschoolTechnologyDefinition = {
	id: "powerschool",
	name: "PowerSchool",
	website: "https://www.powerschool.com",
	description: "PowerSchool is a widely used student information system (SIS) used by K-12 schools, districts, and other educational institutions to manage student data and information. The software is developed and marketed by PowerSchool Group LLC, which is based in California, USA.",
	icon: "PowerSchool.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "powerschool:header:0",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.powerschool\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "powerschool:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^PowerSchool$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "powerschool:meta:2",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^powerschool$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
