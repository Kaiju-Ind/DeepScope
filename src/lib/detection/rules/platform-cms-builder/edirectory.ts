import type { TechnologyDefinition } from '../../types';

export const edirectoryTechnologyDefinition = {
	id: "edirectory",
	name: "eDirectory",
	website: "https://www.edirectory.com",
	description: "eDirectory is an online directory software platform that enables the creation, management, and monetization of searchable, category-based listings for businesses, services, or professionals.",
	icon: "eDirectory.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "edirectory:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.edirectory\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "edirectory:jsGlobal:1",
			kind: "jsGlobal",
			property: "eDirectory.Search",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
