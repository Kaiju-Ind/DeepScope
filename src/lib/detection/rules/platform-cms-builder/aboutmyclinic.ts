import type { TechnologyDefinition } from '../../types';

export const aboutmyclinicTechnologyDefinition = {
	id: "aboutmyclinic",
	name: "AboutMyClinic",
	website: "https://www.aboutmyclinic.com",
	description: "AboutMyClinic is a website builder designed exclusively for doctors to create and manage professional medical practice websites.",
	icon: "AboutMyClinic.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "aboutmyclinic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.aboutmyclinic\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
