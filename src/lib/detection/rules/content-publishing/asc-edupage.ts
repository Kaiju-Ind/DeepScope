import type { TechnologyDefinition } from '../../types';

export const ascEdupageTechnologyDefinition = {
	id: "asc-edupage",
	name: "aSc EduPage",
	website: "https://www.edupage.org",
	description: "aSc EduPage is a cloud-based school management system.",
	icon: "aScEduPage.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "asc-edupage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.edupage\\.org"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
