import type { TechnologyDefinition } from '../../types';

export const easolTechnologyDefinition = {
	id: "easol",
	name: "Easol",
	website: "https://easol.com",
	description: "Easol is a platform that enables businesses to create and manage their experience-based operations.",
	icon: "Easol.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "easol:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.myeasol\\.net"),
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
