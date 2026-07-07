import type { TechnologyDefinition } from '../../types';

export const itorisTechnologyDefinition = {
	id: "itoris",
	name: "Itoris",
	website: "https://www.itoris.com",
	description: "Itoris is a developer specializing in widgets for ecommerce platforms, creating tools that enhance online store functionality.",
	icon: "Itoris.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "itoris:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.itoris\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "itoris:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.itoris\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
