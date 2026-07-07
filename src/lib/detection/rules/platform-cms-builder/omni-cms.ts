import type { TechnologyDefinition } from '../../types';

export const omniCmsTechnologyDefinition = {
	id: "omni-cms",
	name: "Omni CMS",
	website: "https://moderncampus.com/products/web-content-management.html",
	description: "Omni CMS (formerly OU Campus) is a web content management system developed by Modern Campus. Modern Campus is a SaaS-based student lifecycle management software designed to manage continuing education and non-degree programs.",
	icon: "Modern Campus.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "omni-cms:dom:0",
			kind: "dom",
			selector: "a[href*='a.cms.omniupdate.com/11/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:moderncampus:omni_cms:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
