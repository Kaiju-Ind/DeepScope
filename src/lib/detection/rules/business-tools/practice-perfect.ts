import type { TechnologyDefinition } from '../../types';

export const practicePerfectTechnologyDefinition = {
	id: "practice-perfect",
	name: "Practice Perfect",
	website: "https://practiceperfectemr.com",
	description: "Practice Perfect is a cloud-based EMR and practice management application that integrates scheduling, billing, documentation, and reporting for healthcare providers.",
	icon: "PracticePerfect.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "practice-perfect:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.practiceperfectemr\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
