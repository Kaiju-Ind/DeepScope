import type { TechnologyDefinition } from '../../types';

export const noginTechnologyDefinition = {
	id: "nogin",
	name: "Nogin",
	website: "https://www.nogin.com",
	description: "Nogin is a platform operating as Commerce-as-a-Service (CaaS), offering cloud-based ecommerce functionalities and infrastructure for seamless integration and development of ecommerce solutions.",
	icon: "Nogin.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "nogin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.nogin\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nogin:jsGlobal:1",
			kind: "jsGlobal",
			property: "NoginConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nogin:jsGlobal:2",
			kind: "jsGlobal",
			property: "nogin.wishlist",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
