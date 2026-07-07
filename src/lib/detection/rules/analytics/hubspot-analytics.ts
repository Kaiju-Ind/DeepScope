import type { TechnologyDefinition } from '../../types';

export const hubspotAnalyticsTechnologyDefinition = {
	id: "hubspot-analytics",
	name: "HubSpot Analytics",
	website: "https://www.hubspot.com/products/marketing/analytics",
	description: "HubSpot is a marketing and sales software that helps companies attract visitors, convert leads, and close customers.",
	icon: "HubSpot.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "hubspot-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.hs-analytics\\.net\\/analytics"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
