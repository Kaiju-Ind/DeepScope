import type { TechnologyDefinition } from '../../types';

export const kitTechnologyDefinition = {
	id: "kit",
	name: "Kit",
	website: "https://kit.com/fanbridge",
	description: "Kit is a platform that provides email, mobile, and social list management tools for organizing, managing, and engaging contact audiences across digital communication channels.",
	icon: "Kit.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "kit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.fanbridge\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
