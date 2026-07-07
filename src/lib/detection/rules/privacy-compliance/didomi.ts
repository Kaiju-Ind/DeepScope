import type { TechnologyDefinition } from '../../types';

export const didomiTechnologyDefinition = {
	id: "didomi",
	name: "Didomi",
	website: "https://www.didomi.io/en/consent-preference-management",
	description: "Didomi is a consent management platform helping brands and businesses collect, store and leverage their customer consents.",
	icon: "didomi.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "didomi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.privacy-center\\.org\\/.*\\/loader\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
