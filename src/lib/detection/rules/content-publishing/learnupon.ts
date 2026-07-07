import type { TechnologyDefinition } from '../../types';

export const learnuponTechnologyDefinition = {
	id: "learnupon",
	name: "LearnUpon",
	website: "https://www.learnupon.com/",
	description: "LearnUpon is a learning management system (LMS) that helps businesses enhance employee development by streamlining the delivery, management, and tracking of training programs.",
	icon: "LearnUpon.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "learnupon:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^_LearnUpon_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "learnupon:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^_learnupon_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
