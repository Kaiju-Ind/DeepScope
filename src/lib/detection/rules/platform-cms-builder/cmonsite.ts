import type { TechnologyDefinition } from '../../types';

export const cmonsiteTechnologyDefinition = {
	id: "cmonsite",
	name: "CmonSite",
	website: "https://www.cmonsite.fr",
	description: "CmonSite is a French-based platform for building websites and ecommerce stores.",
	icon: "CmonSite.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cmonsite:jsGlobal:0",
			kind: "jsGlobal",
			property: "BASEURL",
			valuePattern: new RegExp("www\\.cmonsite\\.fr"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cmonsite:jsGlobal:1",
			kind: "jsGlobal",
			property: "CmonSite.CookieManagement",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
