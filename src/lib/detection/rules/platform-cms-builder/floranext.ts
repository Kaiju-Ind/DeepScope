import type { TechnologyDefinition } from '../../types';

export const floranextTechnologyDefinition = {
	id: "floranext",
	name: "Floranext",
	website: "https://floranext.com",
	description: "Floristnext is an all-in-one platform offering a florist website, point-of-sale system, and software tailored for managing floral business operations.",
	icon: "Floranext.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "floranext:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.floranext\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
