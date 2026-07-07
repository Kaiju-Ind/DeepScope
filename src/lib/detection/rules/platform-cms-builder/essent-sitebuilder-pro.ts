import type { TechnologyDefinition } from '../../types';

export const essentSitebuilderProTechnologyDefinition = {
	id: "essent-sitebuilder-pro",
	name: "Essent SiteBuilder Pro",
	website: "https://www.essent.com/SiteBuilderPro.html",
	description: "Essent SiteBuilder Pro is a fully-integrated web-based website design system, content management and ecommerce system.",
	icon: "Essent.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "essent-sitebuilder-pro:dom:0",
			kind: "dom",
			selector: "a[href*='www.essent.com'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "essent-sitebuilder-pro:meta:1",
			kind: "meta",
			key: "GENERATOR",
			valuePattern: new RegExp("^Essent® SiteBuilder Pro$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "essent-sitebuilder-pro:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^essent® sitebuilder pro$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
