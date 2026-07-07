import type { TechnologyDefinition } from '../../types';

export const pagetigerTechnologyDefinition = {
	id: "pagetiger",
	name: "Pagetiger",
	website: "https://www.pagetiger.com",
	description: "Pagetiger is a platform that offers pre-made templates and an in-house creative agency to help users create content quickly and securely.",
	icon: "PageTiger.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pagetiger:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.pagetiger\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
