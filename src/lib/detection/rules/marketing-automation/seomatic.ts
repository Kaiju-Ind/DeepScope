import type { TechnologyDefinition } from '../../types';

export const seomaticTechnologyDefinition = {
	id: "seomatic",
	name: "SEOmatic",
	website: "https://plugins.craftcms.com/seomatic",
	description: "SEOmatic facilitates modern SEO best practices & implementation for Craft CMS 3.",
	icon: "SEOmatic.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "seomatic:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^SEOmatic$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "seomatic:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^seomatic$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
		cpe: "cpe:2.3:a:nystudio107:seomatic:*:*:*:*:*:craft_cms:*:*",
	},
	implies: [
		"craft-cms",
	],
} as const satisfies TechnologyDefinition;
