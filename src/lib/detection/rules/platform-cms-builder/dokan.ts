import type { TechnologyDefinition } from '../../types';

export const dokanTechnologyDefinition = {
	id: "dokan",
	name: "Dokan",
	website: "https://wedevs.com/dokan",
	description: "Dokan offers a multi-vendor marketplace solution built on top of wordpress and woocommerce.",
	icon: "Dokan.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "dokan:jsGlobal:0",
			kind: "jsGlobal",
			property: "dokan",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
