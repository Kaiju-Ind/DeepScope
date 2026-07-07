import type { TechnologyDefinition } from '../../types';

export const wildjarTechnologyDefinition = {
	id: "wildjar",
	name: "WildJar",
	website: "https://www.wildjar.com",
	description: "WildJar is a call tracking and intelligence platform which helps you understand where your leads are coming from, who is calling you, what your conversations are about and connect that data into other platforms.",
	icon: "WildJar.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "wildjar:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("trkcall\\.com\\/scripts"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
