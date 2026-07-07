import type { TechnologyDefinition } from '../../types';

export const analyticsconnectTechnologyDefinition = {
	id: "analyticsconnect",
	name: "AnalyticsConnect",
	website: "https://analyticsconnect.io",
	description: "AnalyticsConnect is a tool that tracks eCommerce data from Keap/Infusionsoft in Google Analytics, providing detailed insights and analysis.",
	icon: "AnalyticsConnect.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "analyticsconnect:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.analyticsconnect\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
