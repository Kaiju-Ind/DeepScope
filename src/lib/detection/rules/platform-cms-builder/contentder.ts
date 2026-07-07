import type { TechnologyDefinition } from '../../types';

export const contentderTechnologyDefinition = {
	id: "contentder",
	name: "Contentder",
	website: "https://www.contentder.com",
	description: "Contentder is a website development platform that integrates inbound marketing analytics to optimize site performance.",
	icon: "Contentder.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "contentder:jsGlobal:0",
			kind: "jsGlobal",
			property: "ArticleSetting.GetAdminHostURL",
			valuePattern: new RegExp("easybuilder\\.contentder\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "contentder:jsGlobal:1",
			kind: "jsGlobal",
			property: "BlogSetting.GetAdminHostURL",
			valuePattern: new RegExp("easybuilder\\.contentder\\.com"),
			description: "Page-owned global matches a known technology marker.",
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
} as const satisfies TechnologyDefinition;
