import type { TechnologyDefinition } from '../../types';

export const sitenanoTechnologyDefinition = {
	id: "sitenano",
	name: "SiteNano",
	website: "https://www.sitenano.com",
	description: "SiteNano is a content management and ecommerce platform that enables the creation, management, and operation of websites with integrated online store functionality.",
	icon: "SiteNano.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sitenano:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^SiteNano Internet Works$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
