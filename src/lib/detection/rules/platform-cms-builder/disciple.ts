import type { TechnologyDefinition } from '../../types';

export const discipleTechnologyDefinition = {
	id: "disciple",
	name: "Disciple",
	website: "https://www.disciple.community",
	description: "Disciple is a platform for managing memberships and hosting private online communities in one centralized space.",
	icon: "Disciple.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "disciple:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pwa\\.disciplemedia\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "disciple:jsGlobal:1",
			kind: "jsGlobal",
			property: "discipleFlashMessages",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
