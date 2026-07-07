import type { TechnologyDefinition } from '../../types';

export const puppetvendorsTechnologyDefinition = {
	id: "puppetvendors",
	name: "PuppetVendors",
	website: "https://puppetvendors.com",
	description: "PuppetVendors is a platform that manages sales, commissions, and payout reporting in coordination with third-party vendors.",
	icon: "PuppetVendors.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "puppetvendors:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.puppetvendors\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
