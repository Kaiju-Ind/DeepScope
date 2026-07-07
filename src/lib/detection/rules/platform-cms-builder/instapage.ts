import type { TechnologyDefinition } from '../../types';

export const instapageTechnologyDefinition = {
	id: "instapage",
	name: "Instapage",
	website: "https://instapage.com",
	description: "Instapage is a cloud-based landing page platform designed for marketing teams and agencies.",
	icon: "Instapage.svg",
	categories: [
		"platform-cms-builder",
		"experimentation-optimization",
		"analytics",
	],
	rules: [
		{
			id: "instapage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.instapagemetrics\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "instapage:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("heatmap-events-collector\\.instapage\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "instapage:jsGlobal:2",
			kind: "jsGlobal",
			property: "_instapageSnowplow",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "instapage:jsGlobal:3",
			kind: "jsGlobal",
			property: "instapageSp",
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
	implies: [
		"lua",
		"node-js",
	],
} as const satisfies TechnologyDefinition;
