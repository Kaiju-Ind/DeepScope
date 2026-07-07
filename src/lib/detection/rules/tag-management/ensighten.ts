import type { TechnologyDefinition } from '../../types';

export const ensightenTechnologyDefinition = {
	id: "ensighten",
	name: "Ensighten",
	website: "https://success.ensighten.com/hc/en-us",
	description: "Ensighten is a solution that enables secure management, implementation and control of website technologies.",
	icon: "ensighten.png",
	categories: [
		"tag-management",
	],
	rules: [
		{
			id: "ensighten:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/nexus\\.ensighten\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
