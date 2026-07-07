import type { TechnologyDefinition } from '../../types';

export const sitemanagerTechnologyDefinition = {
	id: "sitemanager",
	name: "SiteManager",
	website: "https://www.sitemanager.io",
	description: "SiteManager is a collaborative no-code/low-code web design platform for agencies and marketing teams.",
	icon: "SiteManager.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sitemanager:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("s\\d+\\.sitemn\\.gr\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sitemanager:dom:1",
			kind: "dom",
			selector: "link[href*='.sitemn.gr/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sitemanager:jsGlobal:2",
			kind: "jsGlobal",
			property: "SM_CookiesModal",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sitemanager:jsGlobal:3",
			kind: "jsGlobal",
			property: "SM_Modal",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sitemanager:jsGlobal:4",
			kind: "jsGlobal",
			property: "swvar_urltext",
			valuePattern: new RegExp("Powered By SiteManager"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"php",
	],
} as const satisfies TechnologyDefinition;
