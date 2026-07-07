import type { TechnologyDefinition } from '../../types';

export const accessiwayTechnologyDefinition = {
	id: "accessiway",
	name: "AccessiWay",
	website: "https://www.accessiway.com",
	description: "AccessiWay is a solution focused on digital accessibility and compliance for organizations seeking to meet established standards.",
	icon: "AccessiWay.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "accessiway:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.accessiway\\.at"),
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
