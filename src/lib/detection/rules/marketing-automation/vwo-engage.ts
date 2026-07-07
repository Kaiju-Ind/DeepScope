import type { TechnologyDefinition } from '../../types';

export const vwoEngageTechnologyDefinition = {
	id: "vwo-engage",
	name: "VWO Engage",
	website: "https://vwo.com/engage",
	description: "VWO Engage is a part of the VWO Platform, which is a web-based push notification platform used by SaaS and B2B marketers, online content publishers, and ecommerce store owners.",
	icon: "VWO.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "vwo-engage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.pushcrew\\.\\w+"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vwo-engage:jsGlobal:1",
			kind: "jsGlobal",
			property: "_pushcrewDebuggingQueue",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
