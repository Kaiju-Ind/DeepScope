import type { TechnologyDefinition } from '../../types';

export const buttercmsTechnologyDefinition = {
	id: "buttercms",
	name: "ButterCMS",
	website: "https://buttercms.com",
	description: "ButterCMS is a SaaS headless CMS with APIs for managing website and app content.",
	icon: "butter-cms.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "buttercms:dom:0",
			kind: "dom",
			selector: "div[data-bg*='cdn.buttercms.com/'], img[src*='cdn.buttercms.com/'], link[href*='cdn.buttercms.com'], a[href*='cdn.buttercms.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
