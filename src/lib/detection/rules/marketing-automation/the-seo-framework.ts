import type { TechnologyDefinition } from '../../types';

export const theSeoFrameworkTechnologyDefinition = {
	id: "the-seo-framework",
	name: "The SEO Framework",
	website: "https://theseoframework.com",
	description: "The SEO Framework is the only WordPress plugin that can intelligently generate critical SEO meta tags by reading your WordPress environment.",
	icon: "The SEO Framework.svg",
	categories: [
		"marketing-automation",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "the-seo-framework:html:0",
			kind: "html",
			pattern: new RegExp("<!--[^>]+The SEO Framework by Sybre Waaijer"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "the-seo-framework:html:1",
			kind: "html",
			pattern: new RegExp("<!--[^>]+the seo framework by sybre waaijer"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
