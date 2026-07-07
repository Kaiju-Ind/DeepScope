import type { TechnologyDefinition } from '../../types';

export const sitevibesTechnologyDefinition = {
	id: "sitevibes",
	name: "SiteVibes",
	website: "https://sitevibes.com",
	description: "SiteVibes is a cloud-based user generated content and visual marketing platform.",
	icon: "SiteVibes.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "sitevibes:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.sitevibes\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sitevibes:jsGlobal:1",
			kind: "jsGlobal",
			property: "SiteVibesManager",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
