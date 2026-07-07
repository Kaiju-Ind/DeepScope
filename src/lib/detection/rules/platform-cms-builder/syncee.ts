import type { TechnologyDefinition } from '../../types';

export const synceeTechnologyDefinition = {
	id: "syncee",
	name: "Syncee",
	website: "https://syncee.co",
	description: "Syncee is a global B2B dropshipping and wholesale platform where retailers can find millions of products from local suppliers, and can enjoy automated solutions.",
	icon: "Syncee.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "syncee:jsGlobal:0",
			kind: "jsGlobal",
			property: "syncee_globals_supplier",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
