import type { TechnologyDefinition } from '../../types';

export const siteglideTechnologyDefinition = {
	id: "siteglide",
	name: "Siteglide",
	website: "https://www.siteglide.com",
	description: "SiteGlide is a Digital Experience Platform (DEP) for ecommerce stores, membership sites and customer portals.",
	icon: "Siteglide.svg",
	categories: [
		"platform-cms-builder",
		"business-tools",
	],
	rules: [
		{
			id: "siteglide:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("siteglide\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
		],
	},
	implies: [
		"platformos",
	],
} as const satisfies TechnologyDefinition;
