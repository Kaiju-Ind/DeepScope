import type { TechnologyDefinition } from '../../types';

export const miraklTechnologyDefinition = {
	id: "mirakl",
	name: "Mirakl",
	website: "https://www.mirakl.com",
	description: "Mirakl is a marketplace SaaS platform designed to support both B2B and B2C commerce operations.",
	icon: "Mirakl.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mirakl:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("mirakl\\.track"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
