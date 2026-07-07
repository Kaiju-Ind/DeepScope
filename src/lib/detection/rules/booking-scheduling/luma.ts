import type { TechnologyDefinition } from '../../types';

export const lumaTechnologyDefinition = {
	id: "luma",
	name: "Luma",
	website: "https://lu.ma",
	description: "Luma is a platform for creating event pages, sending invites, and managing tickets.",
	icon: "Luma.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "luma:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.lu\\.ma"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "luma:jsGlobal:1",
			kind: "jsGlobal",
			property: "luma.initCheckout",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
