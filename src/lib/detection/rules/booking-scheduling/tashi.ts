import type { TechnologyDefinition } from '../../types';

export const tashiTechnologyDefinition = {
	id: "tashi",
	name: "Tashi",
	website: "https://tashi.travel",
	description: "Tashi is a web-based booking software that enables accommodation providers and tour operators to manage reservations and schedules.",
	icon: "Tashi.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "tashi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("meet\\.tashi\\.travel"),
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
