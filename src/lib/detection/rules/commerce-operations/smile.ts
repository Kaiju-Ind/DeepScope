import type { TechnologyDefinition } from '../../types';

export const smileTechnologyDefinition = {
	id: "smile",
	name: "Smile",
	website: "https://smile.io",
	description: "Smile is a provider of ecommerce loyalty programs.",
	icon: "Smile.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "smile:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.(?:smile|sweettooth)\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "smile:jsGlobal:1",
			kind: "jsGlobal",
			property: "Smile.channel_key",
			description: "Page-owned global matches a known technology marker.",
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
