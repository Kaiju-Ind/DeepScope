import type { TechnologyDefinition } from '../../types';

export const hubspotCookiePolicyBannerTechnologyDefinition = {
	id: "hubspot-cookie-policy-banner",
	name: "HubSpot Cookie Policy Banner",
	website: "https://knowledge.hubspot.com/reports/customize-your-cookie-tracking-settings-and-privacy-policy-alert",
	description: "HubSpot Cookie Policy banner is a cookie compliance functionality from HubSpot.",
	icon: "HubSpot.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "hubspot-cookie-policy-banner:dom:0",
			kind: "dom",
			selector: "#hs-eu-cookie-confirmation",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
