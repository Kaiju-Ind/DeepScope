import type { TechnologyDefinition } from '../../types';

export const boosterPageSpeedOptimizerTechnologyDefinition = {
	id: "booster-page-speed-optimizer",
	name: "Booster Page Speed Optimizer",
	website: "https://apps.shopify.com/page-speed-optimizer",
	description: "The Page Speed Optimizer is a Shopify app built by BoosterApps.",
	icon: "BoosterApps.png",
	categories: [
		"ecommerce-extensions",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "booster-page-speed-optimizer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/assets\\/booster-page-speed-optimizer\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
