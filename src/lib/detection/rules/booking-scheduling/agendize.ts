import type { TechnologyDefinition } from '../../types';

export const agendizeTechnologyDefinition = {
	id: "agendize",
	name: "Agendize",
	website: "https://www.agendize.com",
	description: "Agendize is a next-generation, all-in-one platform that streamlines scheduling, secures data, and improves the performance and efficiency of appointment management.",
	icon: "Agendize.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "agendize:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.agendize\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
