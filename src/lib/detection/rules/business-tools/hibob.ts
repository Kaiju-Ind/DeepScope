import type { TechnologyDefinition } from '../../types';

export const hibobTechnologyDefinition = {
	id: "hibob",
	name: "HiBob",
	website: "https://www.hibob.com",
	description: "HiBob is a modern HR platform designed to enhance productivity, employee engagement, and retention for businesses.",
	icon: "HiBob.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "hibob:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.hibob\\.com"),
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
