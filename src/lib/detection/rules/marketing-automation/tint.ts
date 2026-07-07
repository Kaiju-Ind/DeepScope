import type { TechnologyDefinition } from '../../types';

export const tintTechnologyDefinition = {
	id: "tint",
	name: "TINT",
	website: "https://www.tintup.com",
	description: "TINT is a community marketing platform that enables brands to engage audiences, gather user-generated content, and build authentic connections through social and digital channels.",
	icon: "TINT.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "tint:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tintup\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tint:jsGlobal:1",
			kind: "jsGlobal",
			property: "tintAnalyticsClient",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
