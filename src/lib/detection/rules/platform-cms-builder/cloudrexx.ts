import type { TechnologyDefinition } from '../../types';

export const cloudrexxTechnologyDefinition = {
	id: "cloudrexx",
	name: "Cloudrexx",
	website: "https://www.cloudrexx.com",
	description: "Cloudrexx is a proprietary content management system that provides customisable templates and built-in modules for managing content, ecommerce, events, newsletters, and more, along with tools for SEO, social media integration, and multilingual support.",
	icon: "Cloudrexx.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cloudrexx:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^cloudrexx$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
