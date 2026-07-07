import type { TechnologyDefinition } from '../../types';

export const iterasTechnologyDefinition = {
	id: "iteras",
	name: "Iteras",
	website: "https://www.iteras.com",
	description: "Iteras is a subscriber management system that organizes user accounts, tracks subscription activity, and supports controlled access to digital services.",
	icon: "Iteras.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "iteras:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.iteras\\.dk"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "iteras:jsGlobal:1",
			kind: "jsGlobal",
			property: "Iteras.cookieDomain",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
