import type { TechnologyDefinition } from '../../types';

export const kleerTechnologyDefinition = {
	id: "kleer",
	name: "Kleer",
	website: "https://www.kleer.com",
	description: "Kleer is a cloud-based platform that allows dentists to design and manage their own membership plans, offering them directly to uninsured patients.",
	icon: "Kleer.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kleer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("member\\.kleer\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
