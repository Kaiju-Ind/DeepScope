import type { TechnologyDefinition } from '../../types';

export const cfixTechnologyDefinition = {
	id: "cfix",
	name: "Cfixé",
	website: "https://cfixe.com",
	description: "Cfixé is a scheduling platform that enables online booking for everyday services and allows professionals to embed a scheduling widget directly on their website.",
	icon: "Cfixe.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "cfix:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cfixe\\.com"),
			description: "Script content contains a bounded technology signature.",
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
