import type { TechnologyDefinition } from '../../types';

export const posterTechnologyDefinition = {
	id: "poster",
	name: "Poster",
	website: "https://poster.ooo",
	description: "Poster is a live chat and visitor segmentation tool designed to support real-time communication and audience targeting on websites.",
	icon: "Poster.svg",
	categories: [
		"email-messaging",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "poster:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.poster\\.ooo"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
