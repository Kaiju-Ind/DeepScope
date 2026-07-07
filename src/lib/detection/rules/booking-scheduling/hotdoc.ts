import type { TechnologyDefinition } from '../../types';

export const hotdocTechnologyDefinition = {
	id: "hotdoc",
	name: "HotDoc",
	website: "https://www.hotdoc.com.au",
	description: "HotDoc is a platform for booking healthcare appointments, providing patients with access to medical practitioners and clinics.",
	icon: "HotDoc.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "hotdoc:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.hotdoc\\.com\\.au"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hotdoc:jsGlobal:1",
			kind: "jsGlobal",
			property: "hotdoc.assetsURL",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
