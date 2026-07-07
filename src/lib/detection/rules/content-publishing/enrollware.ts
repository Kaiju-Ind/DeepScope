import type { TechnologyDefinition } from '../../types';

export const enrollwareTechnologyDefinition = {
	id: "enrollware",
	name: "Enrollware",
	website: "https://www.enrollwaresolutions.com",
	description: "Enrollware is a CPR class management software that streamlines course scheduling, student registration, instructor tracking, and certification management for training providers.",
	icon: "Enrollware.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "enrollware:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jquery\\.enrollware\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
