import type { TechnologyDefinition } from '../../types';

export const winadsTechnologyDefinition = {
	id: "winads",
	name: "WinAds",
	website: "https://eraofecom.org/collections/tech/products/win-ads-manager",
	description: "Win Ads is a Facebook pixel management app for Shopify that centralizes tracking configuration, event monitoring, and performance optimization within a single interface.",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "winads:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("winads\\.eraofecom\\.org"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
