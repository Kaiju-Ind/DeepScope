import type { TechnologyDefinition } from '../../types';

export const tutorLmsTechnologyDefinition = {
	id: "tutor-lms",
	name: "Tutor LMS",
	website: "https://tutorlms.com",
	description: "Tutor LMS is an all-in-one learning management system.",
	icon: "TutorLMS.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "tutor-lms:jsGlobal:0",
			kind: "jsGlobal",
			property: "tutorElementorData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tutor-lms:jsGlobal:1",
			kind: "jsGlobal",
			property: "tutor_prevent_copy",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
