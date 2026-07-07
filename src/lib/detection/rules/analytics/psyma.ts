import type { TechnologyDefinition } from '../../types';

export const psymaTechnologyDefinition = {
	id: "psyma",
	name: "Psyma",
	website: "https://www.psyma.com/en/industries/automotive/",
	description: "Psyma is a behavior analytics platform specializing in data-driven insights for the automotive industry.",
	icon: "Psyma.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "psyma:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("scripts\\.psyma\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
