import type { TechnologyDefinition } from '../../types';

export const carecloudTechnologyDefinition = {
	id: "carecloud",
	name: "CareCloud",
	website: "https://www.carecloud.com/",
	description: "CareCloud is a platform that provides healthcare providers with a set of tools designed to enhance clinical workflows, improve patient outcomes, and streamline daily business operations.",
	icon: "CareCloud.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "carecloud:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("community\\.carecloud\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "carecloud:jsGlobal:1",
			kind: "jsGlobal",
			property: "CareCloud",
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
