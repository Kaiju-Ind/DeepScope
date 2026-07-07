import type { TechnologyDefinition } from '../../types';

export const clerkIoTechnologyDefinition = {
	id: "clerk-io",
	name: "Clerk.io",
	website: "https://clerk.io",
	description: "Clerk.io is an ecommerce platform for site search, product recommendations, and personalization.",
	icon: "Clerk.io.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "clerk-io:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.clerk\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clerk-io:jsGlobal:1",
			kind: "jsGlobal",
			property: "__clerk_cb_0",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clerk-io:jsGlobal:2",
			kind: "jsGlobal",
			property: "__clerk_q",
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
