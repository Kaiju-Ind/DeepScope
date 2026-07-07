import type { TechnologyDefinition } from '../../types';

export const biginTechnologyDefinition = {
	id: "bigin",
	name: "Bigin",
	website: "https://en.bigin.io",
	description: "Bigin is a cloud-based customer relationship management (CRM) software.",
	icon: "Bigin.png",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "bigin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.bigin\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bigin:jsGlobal:1",
			kind: "jsGlobal",
			property: "BIGIN_SDK_API",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bigin:jsGlobal:2",
			kind: "jsGlobal",
			property: "bigin._checkDataSize",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bigin:jsGlobal:3",
			kind: "jsGlobal",
			property: "biginCafe24DisableOptions",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bigin:jsGlobal:4",
			kind: "jsGlobal",
			property: "bigin_search",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
