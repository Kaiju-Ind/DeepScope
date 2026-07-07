import type { TechnologyDefinition } from '../../types';

export const humblyticsTechnologyDefinition = {
	id: "humblytics",
	name: "Humblytics",
	website: "https://www.humblytics.com",
	description: "Humblytics is an analytics tool that simplifies tracking custom events without coding. It monitors real-time metrics, optimises conversion rates, and provides valuable insights.",
	icon: "Humblytics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "humblytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.humblytics\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
