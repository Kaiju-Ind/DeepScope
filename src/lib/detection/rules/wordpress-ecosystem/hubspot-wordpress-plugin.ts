import type { TechnologyDefinition } from '../../types';

export const hubspotWordpressPluginTechnologyDefinition = {
	id: "hubspot-wordpress-plugin",
	name: "HubSpot WordPress plugin",
	website: "https://wordpress.org/plugins/leadin/",
	description: "HubSpot is a platform with all the tools and integrations you need for marketing, sales, and customer service. HubSpot WordPress plugin allows you to manage contacts (CRM), engage visitors with live chat and chatbots, add beautiful forms to pages, create engaging email marketing campaigns, and more.",
	icon: "HubSpot.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "hubspot-wordpress-plugin:jsGlobal:0",
			kind: "jsGlobal",
			property: "leadin_wordpress.leadinPluginVersion",
			valuePattern: new RegExp("^([\\d.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"hubspot",
		"hubspot-analytics",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
