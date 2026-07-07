import type { TechnologyDefinition } from '../../types';

export const yoCoachTechnologyDefinition = {
	id: "yo-coach",
	name: "Yo!Coach",
	website: "https://www.yo-coach.com",
	description: "Yo!Coach is a tutoring and consultation platform designed to connect learners with experts for one-on-one sessions.",
	icon: "Yo!Coach.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "yo-coach:header:0",
			kind: "header",
			key: "Set-Cookie",
			valuePattern: new RegExp("\\.yo-coach\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "yo-coach:header:1",
			kind: "header",
			key: "set-cookie",
			valuePattern: new RegExp("\\.yo-coach\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
