import type { TechnologyDefinition } from '../../types';

export const cookietractorTechnologyDefinition = {
	id: "cookietractor",
	name: "CookieTractor",
	website: "https://www.cookietractor.com",
	description: "CookieTractor is a cookie consent management platform that helps websites comply with privacy regulations like GDPR and CCPA.",
	icon: "CookieTractor.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "cookietractor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.cookietractor\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cookietractor:jsGlobal:1",
			kind: "jsGlobal",
			property: "cookieTractor",
			description: "Page-owned global matches a known technology marker.",
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
