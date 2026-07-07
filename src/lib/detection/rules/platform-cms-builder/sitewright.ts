import type { TechnologyDefinition } from '../../types';

export const sitewrightTechnologyDefinition = {
	id: "sitewright",
	name: "SiteWright",
	website: "https://www.sitewright.io",
	description: "SiteWright is a platform for creating fitness and wellness websites.",
	icon: "SiteWright.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sitewright:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sitewright\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
