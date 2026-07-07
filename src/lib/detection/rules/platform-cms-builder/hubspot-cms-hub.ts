import type { TechnologyDefinition } from '../../types';

export const hubspotCmsHubTechnologyDefinition = {
	id: "hubspot-cms-hub",
	name: "HubSpot CMS Hub",
	website: "https://www.hubspot.com/products/cms",
	description: "CMS Hub is a content management platform by HubSpot for marketers to manage, optimize, and track content performance on websites, blogs, and landing pages.",
	icon: "HubSpot.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "hubspot-cms-hub:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("HubSpot", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hubspot-cms-hub:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("HubSpot", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "hubspot-cms-hub:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("hubspot", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hubspot-cms-hub:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("hubspot", "i"),
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
	implies: [
		"hubspot",
	],
} as const satisfies TechnologyDefinition;
