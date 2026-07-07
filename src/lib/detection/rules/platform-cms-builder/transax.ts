import type { TechnologyDefinition } from '../../types';

export const transaxTechnologyDefinition = {
	id: "transax",
	name: "Transax",
	website: "https://www.transax.com",
	description: "Transax is a platform that streamlines online sales for dealerships by enabling transactions directly through their website.",
	icon: "Transax.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "transax:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.transax\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "transax:jsGlobal:1",
			kind: "jsGlobal",
			property: "mountingTransaxForms",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
