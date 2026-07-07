import type { TechnologyDefinition } from '../../types';

export const bsecureTechnologyDefinition = {
	id: "bsecure",
	name: "bSecure",
	website: "https://www.bsecure.pk",
	description: "bSecure is an one-click checkout solution for selling your products all across the globe instantly.",
	icon: "bSecure.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "bsecure:jsGlobal:0",
			kind: "jsGlobal",
			property: "bsecure_js_object",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
