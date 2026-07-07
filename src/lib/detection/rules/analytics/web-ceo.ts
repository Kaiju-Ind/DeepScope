import type { TechnologyDefinition } from '../../types';

export const webCeoTechnologyDefinition = {
	id: "web-ceo",
	name: "Web CEO",
	website: "https://www.webceo.com",
	description: "Web CEO is an all-in-one platform offering tools for SEO, digital marketing, and performance analytics.",
	icon: "WebCEO.svg",
	categories: [
		"analytics",
		"marketing-automation",
	],
	rules: [
		{
			id: "web-ceo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.webceo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "web-ceo:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^WebCEO$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "web-ceo:meta:2",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^webceo$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
