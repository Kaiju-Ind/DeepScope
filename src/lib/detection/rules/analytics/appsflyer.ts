import type { TechnologyDefinition } from '../../types';

export const appsflyerTechnologyDefinition = {
	id: "appsflyer",
	name: "Appsflyer",
	website: "https://www.appsflyer.com/",
	description: "AppsFlyer is a SaaS mobile marketing analytics and attribution platform.",
	icon: "Appsflyer.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "appsflyer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("websdk\\.appsflyer\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "appsflyer:jsGlobal:1",
			kind: "jsGlobal",
			property: "AppsFlyerSdkObject",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
