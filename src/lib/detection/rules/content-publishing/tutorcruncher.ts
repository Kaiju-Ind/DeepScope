import type { TechnologyDefinition } from '../../types';

export const tutorcruncherTechnologyDefinition = {
	id: "tutorcruncher",
	name: "TutorCruncher",
	website: "https://tutorcruncher.com",
	description: "TutorCruncher is a tutoring management software.",
	icon: "TutorCruncher.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "tutorcruncher:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.tutorcruncher\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
