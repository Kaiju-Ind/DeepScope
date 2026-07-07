import type { TechnologyDefinition } from '../../types';

export const frogedTechnologyDefinition = {
	id: "froged",
	name: "Froged",
	website: "https://froged.com",
	description: "Froged is an all-in-one omnichannel communication platform designed to streamline messaging across multiple channels.",
	icon: "Froged.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "froged:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.froged\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "froged:jsGlobal:1",
			kind: "jsGlobal",
			property: "Froged",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "froged:jsGlobal:2",
			kind: "jsGlobal",
			property: "frogedAutoClick",
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
