import type { TechnologyDefinition } from '../../types';

export const ubilizTechnologyDefinition = {
	id: "ubiliz",
	name: "Ubiliz",
	website: "https://www.ubiliz.com",
	description: "Ubiliz is a gift voucher ecommerce solution.",
	icon: "Ubiliz.svg",
	categories: [
		"widgets-misc",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ubiliz:jsGlobal:0",
			kind: "jsGlobal",
			property: "ubilizSettings",
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
