import type { TechnologyDefinition } from '../../types';

export const momenceTechnologyDefinition = {
	id: "momence",
	name: "Momence",
	website: "https://momence.com",
	description: "Momence is an all-in-one toolbox for gyms and studios, enabling scheduling of online and in-person classes, events, appointments, and experiences.",
	icon: "Momence.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "momence:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/momence\\.com\\/plugin\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "momence:dom:1",
			kind: "dom",
			selector: "div[id*='momence-plugin-lead-form']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
