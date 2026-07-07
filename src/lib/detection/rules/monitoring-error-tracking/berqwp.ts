import type { TechnologyDefinition } from '../../types';

export const berqwpTechnologyDefinition = {
	id: "berqwp",
	name: "BerqWP",
	website: "https://berqwp.com/",
	description: "BerqWP is a speed optimization plugin designed to help websites pass the core web vitals assessment and improve overall speed scores for better performance.",
	icon: "BerqWP.svg",
	categories: [
		"monitoring-error-tracking",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "berqwp:jsGlobal:0",
			kind: "jsGlobal",
			property: "BerqWPcacheResource",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "berqwp:jsGlobal:1",
			kind: "jsGlobal",
			property: "berqwp_add_assets_browser_cache",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "berqwp:jsGlobal:2",
			kind: "jsGlobal",
			property: "berqwp_readyState",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "berqwp:dom:3",
			kind: "dom",
			selector: "html.berqwp-premium",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:berqier:berqwp:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
