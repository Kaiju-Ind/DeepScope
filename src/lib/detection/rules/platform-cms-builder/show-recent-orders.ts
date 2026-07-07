import type { TechnologyDefinition } from '../../types';

export const showRecentOrdersTechnologyDefinition = {
	id: "show-recent-orders",
	name: "Show Recent Orders",
	website: "https://www.nice-team.net",
	description: "Show Recent Orders is a system that displays recent orders through pop-ups, provides real-time sales updates, and potentially increases conversions.",
	icon: "ShowRecentOrders.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "show-recent-orders:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.nice-team\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
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
