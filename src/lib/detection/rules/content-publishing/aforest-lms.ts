import type { TechnologyDefinition } from '../../types';

export const aforestLmsTechnologyDefinition = {
	id: "aforest-lms",
	name: "Aforest LMS",
	website: "https://www.groupe-aforest.com",
	description: "AFOREST LMS is a training management system that supports the entire training cycle, including client needs assessment, course organization, learner tracking, quality control, assessments, certification, and e-learning integration, with invoicing capabilities.",
	icon: "AforestLMS.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "aforest-lms:meta:0",
			kind: "meta",
			key: "publisher",
			valuePattern: new RegExp("^Aforest Lux - C.I.D.$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "aforest-lms:meta:1",
			kind: "meta",
			key: "publisher",
			valuePattern: new RegExp("^aforest lux - c.i.d.$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
