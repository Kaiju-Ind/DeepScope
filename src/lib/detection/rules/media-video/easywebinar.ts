import type { TechnologyDefinition } from '../../types';

export const easywebinarTechnologyDefinition = {
	id: "easywebinar",
	name: "EasyWebinar",
	website: "https://easywebinar.com",
	description: "EasyWebinar is a webinar platform designed for marketing and growing businesses.",
	icon: "EasyWebinar.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "easywebinar:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.easywebinar\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
